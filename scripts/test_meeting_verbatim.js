const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('scripts/oxford_meeting.en.json3', 'utf8'));

const events = raw.events.slice(44, 61);
const rawWords = [];
events.forEach(e => {
  const text = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ');
  const words = text.split(/\s+/).filter(Boolean);
  rawWords.push(...words);
});

const segments = [
  "Now that you've introduced yourself, the meeting will begin.",
  "During the meeting, you might need to give your opinion on the different agenda items which you are discussing.",
  "You might also need to react to other people's suggestions. How can you do this?",
  "When making suggestions, modal verbs can be very useful. 'Should', 'ought to' or 'might want to' can express something you think is a good idea, but not an obligation:",
  "We ought to give new clients a gift from the company.",
  "We might want to consider looking for another engineer to help with this.",
  "Or: I think we should make this a priority for this month.",
  "'Have to' and 'need to' can express something that is an obligation: We have to improve the way we collect and record sales data.",
  "Or: We need to find a cheaper solution—our budget is very tight.",
  "Remember, you can also use these to make negative suggestions: We shouldn't rush this—we need to think it through carefully. Or: We don't need to hire new staff at the moment."
];

const segmentWords = [];
segments.forEach(s => {
  const words = s.split(/\s+/).filter(Boolean);
  segmentWords.push(...words);
});

console.log('Raw words count:', rawWords.length);
console.log('Segment words count:', segmentWords.length);

function norm(w) {
  return w
    .toLowerCase()
    .replace(/[‘’']/g, "'")
    .replace(/[“”"]/g, '"')
    .replace(/—/g, ' ')
    .replace(/[^a-z0-9']/g, '');
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
