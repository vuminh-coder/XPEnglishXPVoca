const fs = require('fs');
const path = require('path');

function tokenizeStandard(sentence) {
  if (!sentence) return [];
  const words = sentence.trim().split(/\s+/);
  return words
    .map((w, idx) => ({
      index: idx,
      text: w,
      clean: w.replace(/^[^\w\s']+|[^\w\s']+$/g, '')
    }))
    .filter((t) => t.clean.length > 0);
}

const filePath = path.join(__dirname, '../features/listening/data/lessons/movies/inspirational/lesson_cast_away.ts');
const content = fs.readFileSync(filePath, 'utf-8');

const segStart = content.indexOf('segments: [');
const segEnd = content.lastIndexOf('],');
const segments = eval(content.substring(segStart + 10, segEnd + 1));

console.log('Total segments:', segments.length);
console.log('First seg orderIndex:', segments[0].orderIndex, 'text:', segments[0].text);
console.log('Last seg orderIndex:', segments[segments.length - 1].orderIndex, 'text:', segments[segments.length - 1].text);

// Check dashes or merged utterances
let merged = [];
segments.forEach((s, idx) => {
  if (s.text.includes('—') || s.text.includes(' - ') || s.text.includes('--')) {
    merged.push({ idx, orderIndex: s.orderIndex, text: s.text, translationVi: s.translationVi });
  }
});

console.log(`\nMerged/Dash segments (${merged.length}):`);
merged.forEach(m => console.log(`  seg ${m.orderIndex} (idx ${m.idx}): "${m.text}"\n    Vi: "${m.translationVi}"`));

// Check token mismatches
let mismatches = [];
segments.forEach((s, idx) => {
  const tokens = tokenizeStandard(s.text);
  if (tokens.length !== s.tokenCount) {
    mismatches.push({
      idx,
      orderIndex: s.orderIndex,
      declared: s.tokenCount,
      correct: tokens.length,
      text: s.text
    });
  }
});

console.log(`\nToken mismatches (${mismatches.length}):`);
mismatches.forEach(m => console.log(`  seg ${m.orderIndex}: ${m.declared} -> ${m.correct} | "${m.text}"`));

// Parse quiz
const quizStart = content.indexOf('questions: [');
const quizEnd = content.indexOf('export const LESSON_CAST_AWAY');
const quizText = content.substring(quizStart, quizEnd);
const quizRefs = [...quizText.matchAll(/"?id"?:\s*"([^"]+)"[\s\S]*?"?referenceSegmentIndex"?:\s*(\d+)/g)];

console.log(`\nQuiz questions (${quizRefs.length}):`);
quizRefs.forEach(q => {
  const ref = parseInt(q[2]);
  const seg = segments[ref];
  console.log(`  ${q[1]}: ref=${ref} => "${seg ? seg.text.slice(0, 50) : 'OUT OF BOUNDS'}..."`);
});
