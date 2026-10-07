const fs = require('fs');

const off = JSON.parse(fs.readFileSync('scripts/steve_jobs_official.en-eEY6OEpapPo.json3', 'utf8'));
const auto = JSON.parse(fs.readFileSync('scripts/steve_jobs_auto.en.json3', 'utf8'));

// Let's create an exact mapper
const autoWords = [];
auto.events.forEach(e => {
  if (e.segs) {
    e.segs.forEach(s => {
      const text = s.utf8.trim();
      if (!text || text === '\n') return;
      const start = (e.tStartMs + (s.tOffsetMs || 0)) / 1000;
      autoWords.push({ text, start });
    });
  }
});

for (let i = 0; i < autoWords.length - 1; i++) {
  autoWords[i].end = autoWords[i + 1].start;
}

// Find words in range
function findWords(from, to) {
  return autoWords.filter(w => w.start >= from - 0.5 && w.start <= to + 0.5);
}

console.log('=== AUDITING EACH SENTENCE ===');

const sentences = [
  {
    num: 1,
    desc: "Thank you... finest universities in the world.",
    offEvents: [0, 1] // 22.492 -> 32.738
  },
  {
    num: 2,
    desc: "Truth be told... college graduation.",
    offEvents: [2, 3] // 35.559 -> 45.929
  },
  {
    num: 3,
    desc: "Today I want to tell you three stories... Just three stories.",
    offEvents: [4, 5] // 47.980 -> 54.849
  },
  {
    num: 4,
    desc: "The first story is about connecting the dots.",
    offEvents: [6] // 55.850 -> 59.569
  },
  {
    num: 5,
    desc: "I dropped out of Reed College... before I really quit.",
    offEvents: [7, 8, 9] // 61.010 -> 68.728
  },
  {
    num: 6,
    desc: "So why did I drop out? It started before I was born.",
    offEvents: [10, 11] // 69.410 -> 74.369
  },
  {
    num: 7,
    desc: "My biological mother... put me up for adoption.",
    offEvents: [12, 13] // 75.250 -> 81.349
  },
  {
    num: 8,
    desc: "She felt very strongly... lawyer and his wife.",
    offEvents: [14, 15, 16] // 82.360 -> 91.098
  },
  {
    num: 9,
    desc: "Except that when I popped out... really wanted a girl.",
    offEvents: [17, 18] // 91.740 -> 97.549
  },
  {
    num: 10,
    desc: "So my parents, who were on a waiting list... do you want him?",
    offEvents: [19, 20, 21] // 97.920 -> 106.919
  },
  {
    num: 11,
    desc: "They said: 'Of course.'... never graduated from high school.",
    offEvents: [22, 23, 24] // 107.430 -> 118.469
  },
  {
    num: 12,
    desc: "She refused to sign the final adoption papers... promised that I would go to college.",
    offEvents: [25, 26, 27] // 119.160 -> 128.70 (Event 27 has two parts!)
  },
  {
    num: 13,
    desc: "This was the start in my life.",
    offEvents: [] // 129.20 -> 132.80
  },
  {
    num: 14,
    desc: "And 17 years later I did go to college... college tuition.",
    offEvents: [28, 29, 30, 31] // 133.72 -> 146.90
  },
  {
    num: 15,
    desc: "After six months, I couldn't see the value in it... figure it out.",
    offEvents: [32, 33, 34] // 147.40 -> 156.38
  },
  {
    num: 16,
    desc: "And here I was... their entire life.",
    offEvents: [35, 36] // 156.72 -> 161.40
  },
  {
    num: 17,
    desc: "So I decided to drop out and trust that it would all work out OK.",
    offEvents: [37] // 162.40 -> 167.00
  }
];

// Let's inspect Event 27 in detail:
const offRelevant = off.events.filter(e => e.segs && e.tStartMs >= 20000 && e.tStartMs <= 175000);
console.log('Event 27:', JSON.stringify(offRelevant[27]));
