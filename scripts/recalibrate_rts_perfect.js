const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/rewrite_the_stars_18_calibrated.json', 'utf8'));

// Calibrated exact boundaries derived from audio timestamps:
const timings = [
  { start: 0.80, end: 8.80 },   // 1: You know I want you, it's not a secret I try to hide. (sung 1.40 - 8.55)
  { start: 8.90, end: 16.50 },  // 2: I know you want me, so don't keep saying our hands are tied. (sung 9.14 - 16.0)
  { start: 16.50, end: 19.20 }, // 3: You claim it's not in the cards, (sung 16.73 - 19.0)
  { start: 19.20, end: 24.80 }, // 4: And fate is pulling you miles away and out of reach from me. (sung 19.32 - 24.60)
  { start: 24.80, end: 26.60 }, // 5: But you're here in my heart, (sung 24.93 - 26.50)
  { start: 26.60, end: 33.20 }, // 6: So who can stop me if I decide that you're my destiny? (sung 26.61 - 32.50)
  { start: 33.20, end: 38.20 }, // 7: What if we rewrite the stars? (sung 33.47 - 37.8)
  { start: 38.20, end: 43.30 }, // 8: Say you were made to be mine? (sung 38.46 - 42.8)
  { start: 43.30, end: 48.40 }, // 9: Nothing could keep us apart, (sung 43.50 - 48.0)
  { start: 48.40, end: 53.60 }, // 10: You'd be the one I was meant to find. (sung 48.40 - 53.2)
  { start: 53.60, end: 59.00 }, // 11: It's up to you, and it's up to me, (sung 53.80 - 58.5)
  { start: 59.00, end: 64.50 }, // 12: No one can say what we get to be. (sung 59.20 - 64.0)
  { start: 64.50, end: 69.80 }, // 13: So why don't we rewrite the stars? (sung 64.60 - 69.2)
  { start: 69.80, end: 74.00 }, // 14: Maybe the world could be ours tonight. (sung 69.80 - 73.8)
  { start: 74.00, end: 81.50 }, // 15: You think it's easy, you think I don't want to run to you. (sung 74.21 - 80.9)
  { start: 81.50, end: 88.50 }, // 16: But there are mountains, and there are doors that we can't walk through. (sung 81.82 - 88.28)
  { start: 88.50, end: 96.80 }, // 17: I know you're wondering why, because we're able to be just you and me within these walls. (sung 88.66 - 96.86)
  { start: 96.80, end: 105.00 },// 18: But when we go outside, you're gonna wake up and see that it was hopeless after all. (sung 96.89 - 104.5)
];

segments.forEach((seg, i) => {
  seg.startTime = timings[i].start;
  seg.endTime = timings[i].end;
});

fs.writeFileSync('scripts/rewrite_the_stars_18_calibrated.json', JSON.stringify(segments, null, 2), 'utf8');
console.log('Saved perfect timings to scripts/rewrite_the_stars_18_calibrated.json!');
