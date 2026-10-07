const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/ted_bilingual_18_calibrated.json', 'utf8'));

function tokenize(sentence, properNouns) {
  if (!sentence) return [];
  const rawWords = sentence.trim().split(/\s+/);
  const properNounSet = new Set();
  (properNouns || []).forEach(p => properNounSet.add(p.toLowerCase().trim()));

  return rawWords.map((rawWord, idx) => {
    const leadingMatch = rawWord.match(/^([^a-zA-Z0-9\p{L}]*)/u);
    const trailingMatch = rawWord.match(/([^a-zA-Z0-9\p{L}]*)$/u);

    const leadingPunc = leadingMatch ? leadingMatch[1] : '';
    const trailingPunc = trailingMatch ? trailingMatch[1] : '';
    const clean = rawWord.slice(
      leadingPunc.length,
      rawWord.length - trailingPunc.length
    );

    return {
      idx,
      raw: rawWord,
      clean,
      leadingPunc,
      trailingPunc,
      isProperNoun: properNounSet.has(clean.toLowerCase()),
      dots: '•'.repeat(Math.max(1, clean.length))
    };
  });
}

console.log('Testing 18 calibrated segments:');
let totalWords = 0;
let errors = [];

segments.forEach((seg, i) => {
  const tokens = tokenize(seg.text, seg.properNouns);
  totalWords += tokens.length;
  console.log(`[Seg ${i + 1}] (${seg.startTime}s - ${seg.endTime}s | ${(seg.endTime - seg.startTime).toFixed(2)}s) ${tokens.length} words:`);
  console.log(`       Text: "${seg.text}"`);
  console.log(`       Tokens: ${tokens.map(t => t.clean + (t.isProperNoun ? '*' : '')).join(' ')}`);

  tokens.forEach(t => {
    if (!t.clean || t.clean.length === 0) {
      errors.push(`Seg ${i + 1} has empty clean token for raw: "${t.raw}"`);
    }
  });
});

console.log('Total words:', totalWords);
if (errors.length > 0) {
  console.error('ERRORS FOUND:', errors);
} else {
  console.log('ALL TOKENS VALID! Zero empty tokens.');
}
