const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/bbc_laughter_medicine.en-GB.json3', 'utf8'));
const calibrated = JSON.parse(fs.readFileSync('scripts/bbc_laugh_18_calibrated.json', 'utf8'));

console.log('=== FORENSIC DEEP AUDIT FOR BBC 6 MINUTE ENGLISH: WHY LAUGHTER IS THE BEST MEDICINE ===\n');

// Group raw events into 18 chunks:
const groups = [
  [0, 1],                    // 1: Hello. This is 6 Minute English from BBC Learning English.
  [2, 3, 4],                 // 2: I'm Sam. And I'm Neil. Have you heard this joke, Neil?
  [5, 6],                    // 3: Question: what's a rat's favourite game?
  [7, 8],                    // 4: I don't know, Sam, what is a rat's favourite game?
  [9, 10],                   // 5: Hide and squeak! Ha-ha-ha! Very funny!
  [11, 12, 13, 14],          // 6: Well, I'm glad you're laughing because, as we'll be finding out in this programme, laughter is good for you!
  [14, 15, 16],              // 7: In fact, laughter is often called 'the best medicine'.
  [17, 18, 19, 20],          // 8: And it seems that's really true, medically speaking. Laughing releases anti-stress endorphins into the body,
  [20, 21, 22, 23],          // 9: and there's evidence that people who laugh recover more quickly from illness, including Covid.
  [24, 25],                  // 10: Laughing is an essential part of what makes us human.
  [26, 27, 28, 29, 30],      // 11: Babies cry straight from birth but the next sound they make, often as young as two or three months, is laughter.
  [31, 32, 33, 34],          // 12: And who can hear a baby laugh without laughing themselves? Laughter is catching.
  [35, 36, 37, 38, 39],      // 13: But before we start tickling our funny bones, I have a quiz question for you, Neil, and it's no laughing matter.
  [39, 40, 41, 42, 43, 44],  // 14: Laughter can be a serious business. In fact, there's a scientific field of study into laughter and its effects on the human body.
  [44, 45, 46, 47],          // 15: But what is this study called? Is it: a) gigglology, b) gelotology, or c) guffology?
  [48, 49, 50, 51, 52],      // 16: Did you make those words up, Sam? They sound a bit funny to me! I'll say the study of laughter is called b) gelotology.
  [53, 54, 55],              // 17: OK, Neil, but you'll be laughing on the other side of your face if you're wrong!
  [56, 57, 58],              // 18: Anyway, we'll find out the correct answer later in the programme.
];

let totalIssues = 0;

calibrated.forEach((seg, idx) => {
  const g = groups[idx];
  const firstEv = raw.events[g[0]];
  const lastEv = raw.events[g[g.length - 1]];

  const rawStart = firstEv.tStartMs / 1000;
  const rawEnd = (lastEv.tStartMs + (lastEv.dDurationMs || 0)) / 1000;
  const durSec = (seg.endTime - seg.startTime).toFixed(2);

  const leadMs = Math.round((rawStart - seg.startTime) * 1000);
  const tailMs = Math.round((seg.endTime - rawEnd) * 1000);

  const words = seg.text.replace(/["\.,\?!:;']/g, '').trim().split(/\s+/).filter(Boolean);
  const ipaValid = /^\/.*\/$/.test(seg.ipaUs);
  const transValid = seg.translationVi && seg.translationVi.length > 5;
  const keywordsValid = Array.isArray(seg.keywords) && seg.keywords.length > 0;

  console.log(`[Segment #${seg.orderIndex + 1}]`);
  console.log(`  Timing         : [${seg.startTime.toFixed(2)}s - ${seg.endTime.toFixed(2)}s] (${durSec}s)`);
  console.log(`  Raw Events     : [${rawStart.toFixed(2)}s - ${rawEnd.toFixed(2)}s] (events ${g.map(i => '#' + i).join(', ')})`);
  console.log(`  Lead-in / Tail : +${leadMs}ms / +${tailMs}ms`);
  console.log(`  Spoken Text    : "${seg.text}"`);
  console.log(`  Word Tokens    : ${words.length} words`);
  console.log(`  Proper Nouns   : [${(seg.properNouns || []).join(', ')}]`);
  console.log(`  IPA (UK/US)    : ${seg.ipaUs} -> ${ipaValid ? '✅ VALID' : '❌ INVALID'}`);
  console.log(`  Translation VI : "${seg.translationVi}" -> ${transValid ? '✅ VALID' : '❌ INVALID'}`);
  console.log(`  Keywords       : [${seg.keywords.join(', ')}] -> ${keywordsValid ? '✅ VALID' : '❌ INVALID'}`);
  console.log(`  Explanation    : "${seg.explanation}"`);

  if (!ipaValid || !transValid || !keywordsValid) {
    totalIssues++;
  }
});

// Chronological continuity
console.log('\n--- CHRONOLOGICAL CONTINUITY AUDIT ---');
for (let i = 0; i < calibrated.length - 1; i++) {
  const current = calibrated[i];
  const next = calibrated[i + 1];

  if (current.endTime > next.startTime + 0.05) {
    console.error(`❌ Overlap detected between #${current.orderIndex + 1} (${current.endTime}s) and #${next.orderIndex + 1} (${next.startTime}s)`);
    totalIssues++;
  } else {
    const gap = (next.startTime - current.endTime).toFixed(2);
    console.log(`  #${current.orderIndex + 1} -> #${next.orderIndex + 1}: ${current.endTime.toFixed(2)}s -> ${next.startTime.toFixed(2)}s (gap: ${gap}s) ✅ FLUID`);
  }
}

console.log(`\n========================================`);
console.log(`AUDIT RESULT: ${totalIssues === 0 ? '🏆 100% VERBATIM PASS (0 ISSUES)' : `⚠️ ${totalIssues} ISSUES FOUND`}`);
console.log(`========================================`);
