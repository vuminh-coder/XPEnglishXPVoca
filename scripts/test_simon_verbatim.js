const fs = require('fs');

const en = JSON.parse(fs.readFileSync('scripts/simon_sinek_ted.en.json3', 'utf8'));

// All words in the JSON3 events between 16257 and 123257
const events = en.events.filter(e => e.tStartMs >= 16000 && e.tStartMs < 125000 && e.segs);
const rawWords = [];
events.forEach(e => {
  const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ');
  const words = text.split(/\s+/).filter(Boolean);
  rawWords.push(...words);
});

console.log('Total raw words in range:', rawWords.length);

const segments = [
  "How do you explain when things don't go as we assume? Or better, how do you explain when others are able to achieve things that seem to defy all of the assumptions?",
  "For example: Why is Apple so innovative? Year after year, after year, they're more innovative than all their competition.",
  "And yet, they're just a computer company. They're just like everyone else. They have the same access to the same talent, the same agencies, the same consultants, the same media. Then why is it that they seem to have something different?",
  "Why is it that Martin Luther King led the Civil Rights Movement? He wasn't the only man who suffered in pre-civil rights America, and he certainly wasn't the only great orator of the day. Why him?",
  "And why is it that the Wright brothers were able to figure out controlled, powered man flight when there were certainly other teams who were better qualified, better funded -- and they didn't achieve powered man flight, and the Wright brothers beat them to it.",
  "There's something else at play here. About three and a half years ago, I made a discovery. And this discovery profoundly changed my view on how I thought the world worked, and it even profoundly changed the way in which I operate in it.",
  "As it turns out, there's a pattern. As it turns out, all the great inspiring leaders and organizations in the world, whether it's Apple or Martin Luther King or the Wright brothers, they all think, act and communicate the exact same way.",
  "And it's the complete opposite to everyone else. All I did was codify it, and it's probably the world's simplest idea. I call it the golden circle."
];

const segmentWords = [];
segments.forEach(s => {
  const words = s.split(/\s+/).filter(Boolean);
  segmentWords.push(...words);
});

console.log('Total segment words:', segmentWords.length);

// Compare word by word normalized
function norm(w) {
  return w.toLowerCase().replace(/[^a-z0-9']/g, '');
}

let diffs = 0;
for (let i = 0; i < Math.max(rawWords.length, segmentWords.length); i++) {
  const rw = rawWords[i] || '<missing>';
  const sw = segmentWords[i] || '<missing>';
  if (norm(rw) !== norm(sw)) {
    console.log(`Diff at ${i}: Raw="${rw}" vs Seg="${sw}"`);
    diffs++;
  }
}

if (diffs === 0) {
  console.log(`🎉 PERFECT 100% MATCH! Zero diffs across ${rawWords.length} words!`);
} else {
  console.log(`Found ${diffs} differences.`);
}
