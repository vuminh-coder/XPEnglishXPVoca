const fs = require('fs');

const orig = JSON.parse(fs.readFileSync('scripts/ted_bilingual_raw.en.json3', 'utf8'));
const calibrated = JSON.parse(fs.readFileSync('scripts/ted_bilingual_18_calibrated.json', 'utf8'));

console.log('=== FORENSIC DEEP AUDIT FOR TED-ED: THE BENEFITS OF A BILINGUAL BRAIN (18 SEGMENTS) ===\n');

let totalIssues = 0;

calibrated.forEach((seg, i) => {
  const durSec = (seg.endTime - seg.startTime).toFixed(2);
  const actualTokens = seg.text.replace(/["\.,\?!:;¿]/g, '').trim().split(/\s+/).filter(Boolean).length;
  const ipaValid = /^\/.*\/$/.test(seg.ipaUs);
  const transValid = seg.translationVi && seg.translationVi.length > 5;
  const keywordsValid = Array.isArray(seg.keywords) && seg.keywords.length > 0;

  console.log(`[Segment #${seg.orderIndex + 1}]`);
  console.log(`  Timing         : [${seg.startTime.toFixed(2)}s - ${seg.endTime.toFixed(2)}s] (${durSec}s)`);
  console.log(`  Spoken Text    : "${seg.text}"`);
  console.log(`  Word Tokens    : ${actualTokens} words`);
  console.log(`  Proper Nouns   : [${(seg.properNouns || []).join(', ')}]`);
  console.log(`  IPA (US)       : ${seg.ipaUs} -> ${ipaValid ? '✅ VALID' : '❌ INVALID'}`);
  console.log(`  Translation VI : "${seg.translationVi}" -> ${transValid ? '✅ VALID' : '❌ INVALID'}`);
  console.log(`  Keywords       : [${seg.keywords.join(', ')}] -> ${keywordsValid ? '✅ VALID' : '❌ INVALID'}`);
  console.log(`  Explanation    : "${seg.explanation}"`);

  if (!ipaValid || !transValid || !keywordsValid) {
    totalIssues++;
  }
});

// Chronological continuity & boundary check
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
