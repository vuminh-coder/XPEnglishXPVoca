const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scripts/bbc_brain_official.en-GB.json3', 'utf8'));
const events = data.events.filter(e => e.segs && e.segs.some(s => s.utf8 && s.utf8.trim()));

// Official raw text concatenated per sentence
const officialSentences = [
  // 1: Event 0 & 1
  events.slice(0, 2).map(e => e.segs.map(s => s.utf8).join('')).join(' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
  // 2: Event 2 & 3
  events.slice(2, 4).map(e => e.segs.map(s => s.utf8).join('')).join(' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
  // 3: Event 4
  events.slice(4, 5).map(e => e.segs.map(s => s.utf8).join('')).join(' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
  // 4: Event 5 & 6
  events.slice(5, 7).map(e => e.segs.map(s => s.utf8).join('')).join(' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
  // 5: Event 7 & 8
  events.slice(7, 9).map(e => e.segs.map(s => s.utf8).join('')).join(' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
  // 6: Event 9
  events.slice(9, 10).map(e => e.segs.map(s => s.utf8).join('')).join(' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
  // 7: Event 10 & 11
  events.slice(10, 12).map(e => e.segs.map(s => s.utf8).join('')).join(' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
  // 8: Event 12 & 13
  events.slice(12, 14).map(e => e.segs.map(s => s.utf8).join('')).join(' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
  // 9: Event 14 & 15
  events.slice(14, 16).map(e => e.segs.map(s => s.utf8).join('')).join(' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
  // 10: Event 16 & 17
  events.slice(16, 18).map(e => e.segs.map(s => s.utf8).join('')).join(' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
  // 11: Event 18 & 19
  events.slice(18, 20).map(e => e.segs.map(s => s.utf8).join('')).join(' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
  // 12: Event 20 & 21
  events.slice(20, 22).map(e => e.segs.map(s => s.utf8).join('')).join(' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
  // 13: Event 22 & 23
  events.slice(22, 24).map(e => e.segs.map(s => s.utf8).join('')).join(' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
];

const calibrated = JSON.parse(fs.readFileSync('scripts/bbc_13_calibrated.json', 'utf8'));

console.log('Comparing 13 sentences against official BBC text:');
let allMatch = true;

for (let i = 0; i < 13; i++) {
  const off = officialSentences[i];
  const cal = calibrated[i].text;
  const match = off === cal;
  console.log(`\n--- Sentence ${i + 1} ---`);
  console.log(`Official  : "${off}"`);
  console.log(`Calibrated: "${cal}"`);
  console.log(`Match: ${match ? '✅ EXACT 100%' : '❌ DIFFERENCE'}`);
  if (!match) {
    allMatch = false;
  }
}

console.log('\n================================');
console.log('Overall Match:', allMatch ? '100% IDENTICAL' : 'HAS DIFFERENCES');
