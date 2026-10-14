const fs = require('fs');

const segments = [
  {
    orderIndex: 1,
    startTime: 0.08,
    endTime: 5.20,
    text: "In the book, The Psychology of Money, Morgan Housel shares Warren Buffett's real secret.",
  },
  {
    orderIndex: 2,
    startTime: 5.50,
    endTime: 8.50,
    text: "It's not stock-picking, it's patience.",
  },
  {
    orderIndex: 3,
    startTime: 8.80,
    endTime: 13.00,
    text: "Housel explains that compound interest only works if you stay in the game.",
  },
  {
    orderIndex: 4,
    startTime: 13.20,
    endTime: 15.00,
    text: "Most people want to get rich fast.",
  },
  {
    orderIndex: 5,
    startTime: 15.20,
    endTime: 19.00,
    text: "They jump in, jump out, chase trends, and end up with nothing.",
  },
  {
    orderIndex: 6,
    startTime: 19.04,
    endTime: 20.40,
    text: "But Buffett?",
  },
  {
    orderIndex: 7,
    startTime: 20.56,
    endTime: 23.00,
    text: "He's been investing for more than 70 years.",
  },
  {
    orderIndex: 8,
    startTime: 23.20,
    endTime: 24.90,
    text: "The magic isn't his IQ.",
  },
  {
    orderIndex: 9,
    startTime: 25.12,
    endTime: 27.00,
    text: "It's that he never left the table.",
  },
  {
    orderIndex: 10,
    startTime: 27.28,
    endTime: 30.00,
    text: "Compounding needs time, not genius.",
  },
  {
    orderIndex: 11,
    startTime: 30.32,
    endTime: 32.80,
    text: "That's the lesson from The Psychology of Money.",
  },
  {
    orderIndex: 12,
    startTime: 33.20,
    endTime: 35.10,
    text: "If you want wealth, stop rushing.",
  },
  {
    orderIndex: 13,
    startTime: 35.36,
    endTime: 37.30,
    text: "Be patient. Stay consistent.",
  },
  {
    orderIndex: 14,
    startTime: 37.60,
    endTime: 39.00,
    text: "That's the real secret.",
  },
  {
    orderIndex: 15,
    startTime: 39.28,
    endTime: 42.00,
    text: "So master your mind, not the market.",
  },
  {
    orderIndex: 16,
    startTime: 42.48,
    endTime: 47.00,
    text: "Comment. Do you think money is more math or behavior?",
  }
];

function cleanWords(str) {
  return str
    .replace(/stock-picking/gi, 'stockpicking')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')
    .replace(/['"]+/g, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim().toLowerCase())
    .filter(Boolean);
}

function normalizeAsr(words) {
  return words.map((w) => {
    if (w === 'howell' || w === 'howel') return 'housel';
    return w;
  });
}

const rawJson = JSON.parse(fs.readFileSync('scripts/money.en.json3', 'utf8'));
const wordEvents = [];
rawJson.events.forEach((e) => {
  if (e.segs) {
    e.segs.forEach((s) => {
      const txt = (s.utf8 || '').trim();
      if (txt && txt !== '\n') {
        const offset = s.tOffsetMs || 0;
        const time = (e.tStartMs + offset) / 1000;
        const words = cleanWords(txt);
        words.forEach((w) => {
          wordEvents.push({ time, word: w });
        });
      }
    });
  }
});

const uniqueWords = [];
for (let i = 0; i < wordEvents.length; i++) {
  const w = wordEvents[i];
  const last = uniqueWords[uniqueWords.length - 1];
  if (last && last === w.word && Math.abs(w.time - (wordEvents[i - 1]?.time || 0)) < 0.5) {
    continue;
  }
  uniqueWords.push(w.word);
}

const normRaw = normalizeAsr(uniqueWords);
const normLesson = normalizeAsr(cleanWords(segments.map((s) => s.text).join(' ')));

console.log('Norm raw length:', normRaw.length);
console.log('Norm lesson length:', normLesson.length);
let diffCount = 0;
for (let i = 0; i < Math.max(normRaw.length, normLesson.length); i++) {
  if (normRaw[i] !== normLesson[i]) {
    console.log('Diff at', i, 'raw:', normRaw[i], 'lesson:', normLesson[i]);
    diffCount++;
  }
}
console.log('Total diffs:', diffCount);

segments.forEach(s => {
  const matches = s.text.match(/\b[A-Za-z0-9_]+\b/g) || [];
  console.log(`Seg ${s.orderIndex}: tokens=${matches.length}, text: "${s.text}"`);
});
