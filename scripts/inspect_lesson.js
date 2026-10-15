const fs = require('fs');
const path = require('path');

function tokenizeSentence(sentence, properNouns = []) {
  if (!sentence) return [];
  const normalizedPNDict = {};
  properNouns.forEach(pn => {
    normalizedPNDict[pn.toLowerCase().trim()] = pn.trim();
  });
  const words = sentence.trim().split(/\s+/);
  return words.map((w, idx) => {
    const clean = w.replace(/^[^\w\s']+|[^\w\s']+$/g, '');
    const isPN = !!normalizedPNDict[clean.toLowerCase()];
    return {
      index: idx,
      text: w,
      cleanText: clean,
      isProperNoun: isPN,
      isPunctuation: /^[^\w\s]+$/.test(w)
    };
  }).filter(t => t.cleanText.length > 0 || t.isPunctuation);
}

// ============== CONFIG ==============
const LESSON_FILE = 'lesson_modern_family_gloria.ts';
const LESSON_DIR = path.join(__dirname, '../features/listening/data/lessons/movies/sitcoms');
const filePath = path.join(LESSON_DIR, LESSON_FILE);
const QUIZ_ID_PREFIX = 'mov_sit_04'; // Used to find quiz question IDs
// ====================================

let content = fs.readFileSync(filePath, 'utf-8');

console.log('=== INSPECTION: ' + LESSON_FILE + ' ===');
console.log('File size:', content.length);

// 1. Check orderIndex
const orderMatches = content.match(/"orderIndex":\s*(\d+)/g);
console.log('\nTotal orderIndex matches:', orderMatches ? orderMatches.length : 0);
if (orderMatches) {
  const indices = orderMatches.map(m => parseInt(m.match(/\d+/)[0]));
  console.log('Min orderIndex:', Math.min(...indices));
  console.log('Max orderIndex:', Math.max(...indices));
  console.log('Is 0-indexed:', Math.min(...indices) === 0);
  console.log('Is 1-indexed:', Math.min(...indices) === 1);
}

// 2. Check quiz referenceSegmentIndex
const quizPatterns = [
  new RegExp(`"id":\\s*"(?:${QUIZ_ID_PREFIX}_q|q_${QUIZ_ID_PREFIX}_)(\\d+)"[\\s\\S]*?"referenceSegmentIndex":\\s*(\\d+)`, 'g'),
];
let quizMatches = [];
for (const p of quizPatterns) {
  quizMatches = quizMatches.concat([...content.matchAll(p)]);
}
console.log('\nQuiz references found:', quizMatches.length);
for (const m of quizMatches) {
  console.log(`  Q${m[1]}: referenceSegmentIndex = ${m[2]}`);
}

// 3. Check tokenCount mismatches
const segBlocks = content.split(/\{\s*(?:"startTime"|"orderIndex"): /g).slice(1);
let mismatches = [];
segBlocks.forEach((block, idx) => {
  const textMatch = block.match(/"text":\s*"([^"]+)"/);
  const orderMatch = block.match(/"orderIndex":\s*(\d+)/);
  const tokenMatch = block.match(/"tokenCount":\s*(\d+)/);
  const pnMatch = block.match(/"properNouns":\s*(\[[^\]]*\])/);

  if (!textMatch || !tokenMatch) return;
  const text = textMatch[1];
  const orderIndex = orderMatch ? parseInt(orderMatch[1]) : idx;
  const tokenCount = parseInt(tokenMatch[1]);
  const properNouns = pnMatch ? JSON.parse(pnMatch[1]) : [];

  const tokens = tokenizeSentence(text, properNouns);
  if (tokens.length !== tokenCount) {
    mismatches.push({ orderIndex, declared: tokenCount, correct: tokens.length, text });
  }
});

console.log(`\nTokenCount mismatches: ${mismatches.length}`);
if (mismatches.length > 0 && mismatches.length <= 10) {
  mismatches.forEach(m => console.log(`  seg ${m.orderIndex}: declared=${m.declared}, correct=${m.correct} "${m.text}"`));
} else if (mismatches.length > 10) {
  console.log('  (showing first 5)');
  mismatches.slice(0, 5).forEach(m => console.log(`  seg ${m.orderIndex}: declared=${m.declared}, correct=${m.correct} "${m.text}"`));
}

// 4. Check for merged utterances
let mergedCount = 0;
segBlocks.forEach(block => {
  const textMatch = block.match(/"text":\s*"([^"]+)"/);
  if (textMatch && textMatch[1].includes(' — ')) mergedCount++;
});
console.log(`\nMerged utterances (contains ' — '): ${mergedCount}`);

// 5. Check IPA
let ipaIssues = 0;
segBlocks.forEach(block => {
  const ipaMatch = block.match(/"ipaUs":\s*"([^"]+)"/);
  if (ipaMatch) {
    if (!ipaMatch[1].startsWith('/') || !ipaMatch[1].endsWith('/')) ipaIssues++;
  }
});
console.log(`IPA format issues (not wrapped in /.../): ${ipaIssues}`);

console.log('\n=== SUMMARY ===');
const isZeroIndexed = orderMatches && parseInt(orderMatches[0].match(/\d+/)[0]) === 0;
const segCount = orderMatches ? orderMatches.length : 0;
console.log(`Segments: ${segCount}, Currently ${isZeroIndexed ? '0-indexed' : '1-indexed'}`);
console.log(`TokenCount fixes needed: ${mismatches.length}`);
console.log(`Quiz questions: ${quizMatches.length}`);
console.log(`Merged utterances: ${mergedCount}`);
console.log(`IPA issues: ${ipaIssues}`);
