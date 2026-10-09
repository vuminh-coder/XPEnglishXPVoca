const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/julian_treasure.en.json3', 'utf8'));
const evs = data.events.filter(e => e.tStartMs >= 13900 && e.tStartMs < 72000 && e.segs);
const rawWords = [];
evs.forEach(e => {
  const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ');
  const words = text.split(/\s+/).filter(Boolean);
  rawWords.push(...words);
});

const segments = [
  "The human voice: It's the instrument we all play.",
  "It's the most powerful sound in the world, probably. It's the only one that can start a war or say \"I love you.\"",
  "And yet many people have the experience that when they speak, people don't listen to them. And why is that?",
  "How can we speak powerfully to make change in the world?",
  "What I'd like to suggest, there are a number of habits that we need to move away from.",
  "I've assembled for your pleasure here seven deadly sins of speaking.",
  "I'm not pretending this is an exhaustive list, but these seven, I think, are pretty large habits that we can all fall into.",
  "First, gossip. Speaking ill of somebody who's not present.",
  "Not a nice habit, and we know perfectly well the person gossiping, five minutes later, will be gossiping about us.",
  "Second, judging. We know people who are like this in conversation, and it's very hard to listen to somebody if you know that you're being judged and found wanting at the same time."
];

const segWords = [];
segments.forEach(s => {
  const words = s.split(/\s+/).filter(Boolean);
  segWords.push(...words);
});

console.log('Raw words count:', rawWords.length);
console.log('Seg words count:', segWords.length);

function norm(w) {
  return w.toLowerCase().replace(/[‘’']/g, "'").replace(/[“”"]/g, '').replace(/[^a-z0-9']/g, '');
}

let diffs = 0;
for (let i = 0; i < Math.max(rawWords.length, segWords.length); i++) {
  const rw = rawWords[i] || '<missing>';
  const sw = segWords[i] || '<missing>';
  if (norm(rw) !== norm(sw)) {
    console.log(`Diff at ${i}: Raw="${rw}" vs Seg="${sw}"`);
    diffs++;
  }
}

if (diffs === 0) {
  console.log(`🎉 PERFECT 100% MATCH! Zero diffs across ${rawWords.length} words!`);
} else {
  console.log(`Found ${diffs} differences`);
}
