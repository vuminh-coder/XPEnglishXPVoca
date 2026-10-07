const fs = require('fs');
const sub = JSON.parse(fs.readFileSync('scripts/kurzgesagt_raw.en.json3', 'utf8'));
const lines = sub.events.filter(e => e.segs).map(e => ({
  start: e.tStartMs / 1000,
  duration: e.dDurationMs / 1000,
  end: (e.tStartMs + e.dDurationMs) / 1000,
  text: e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
})).filter(l => l.text);

// Let's examine if 8 ("They have rockets, nuclear reactors and memes. How cute!") should be 1 sentence
// And "Today: how might civilizations wage war across light years?" as 1 sentence.
const sentenceGroups = [
  // 1
  { segs: [0] },
  // 2
  { segs: [1, 2] },
  // 3
  { segs: [3, 4] },
  // 4
  { segs: [5, 6] },
  // 5
  { segs: [7] },
  // 6
  { segs: [8] },
  // 7
  { segs: [9, 10] },
  // 8
  { segs: [11, 12] },
  // 9
  { segs: [13] },
  // 10
  { segs: [14, 15] },
  // 11
  { segs: [16, 17] },
  // 12
  { segs: [18, 19] },
  // 13
  { segs: [20, 21, 22, 23] },
  // 14
  { segs: [24] },
  // 15
  { segs: [25] },
  // 16
  { segs: [26] },
  // 17
  { segs: [27, 28] },
  // 18
  { segs: [29] },
  // 19
  { segs: [30, 31, 32] }
];

sentenceGroups.forEach((sg, i) => {
  const start = lines[sg.segs[0]].start;
  const end = lines[sg.segs[sg.segs.length - 1]].end;
  const text = sg.segs.map(idx => lines[idx].text).join(' ');
  console.log(`${i + 1}. [${start.toFixed(2)}s - ${end.toFixed(2)}s] (${(end - start).toFixed(2)}s): "${text}"`);
});
