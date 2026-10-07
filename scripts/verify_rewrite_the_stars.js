const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/rewrite_the_stars_18_calibrated.json', 'utf8'));

console.log('Verifying 18 segments for Rewrite The Stars:');

let issues = 0;

segments.forEach((seg, idx) => {
  const actualTokens = seg.text.replace(/["\.,\?!:;]/g, '').trim().split(/\s+/).filter(Boolean).length;
  const tokenMatch = actualTokens === seg.tokenCount;
  const duration = seg.endTime - seg.startTime;
  console.log(`\nSentence #${seg.orderIndex} [${seg.startTime.toFixed(2)}s - ${seg.endTime.toFixed(2)}s] (${duration.toFixed(2)}s):`);
  console.log(`  Text       : "${seg.text}"`);
  console.log(`  Tokens     : ${seg.tokenCount} (Calculated: ${actualTokens}) -> ${tokenMatch ? '✅ MATCH' : '❌ MISMATCH'}`);
  console.log(`  IPA (US)   : /${seg.ipaUs}/`);
  console.log(`  Translation: "${seg.translationVi}"`);

  if (!tokenMatch) issues++;
});

// Check for chronological overlap
for (let i = 0; i < segments.length - 1; i++) {
  if (segments[i].endTime > segments[i + 1].startTime) {
    console.error(`❌ Overlap detected between #${segments[i].orderIndex} and #${segments[i + 1].orderIndex}`);
    issues++;
  }
}

console.log('\n=======================================');
console.log(`Total Issues: ${issues}`);
