const fs = require('fs');
const path = require('path');

function tokenizeSentence(sentence, properNouns = []) {
  if (!sentence) return [];
  const normalizedPNDict = {};
  properNouns.forEach(pn => { normalizedPNDict[pn.toLowerCase().trim()] = pn.trim(); });
  const words = sentence.trim().split(/\s+/);
  return words.map((w, idx) => {
    const clean = w.replace(/^[^\w\s']+|[^\w\s']+$/g, '');
    return { cleanText: clean, isPunctuation: /^[^\w\s]+$/.test(w) };
  }).filter(t => t.cleanText.length > 0 || t.isPunctuation);
}

const filePath = path.join(__dirname, '../features/listening/data/lessons/movies/inspirational/lesson_pursuit_of_happyness.ts');
const content = fs.readFileSync(filePath, 'utf-8');

const segStart = content.indexOf('segments: [');
const segEnd = content.lastIndexOf('],');
const segsJson = content.substring(segStart + 10, segEnd + 1);
const segments = eval(segsJson);

console.log('Total segments:', segments.length);
console.log('First seg orderIndex:', segments[0].orderIndex, 'text:', segments[0].text);
console.log('Last seg orderIndex:', segments[segments.length - 1].orderIndex, 'text:', segments[segments.length - 1].text);

// Check token mismatches
let mismatches = [];
segments.forEach((s, idx) => {
  const tokens = tokenizeSentence(s.text, s.properNouns || []);
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
mismatches.slice(0, 10).forEach(m => console.log(`  seg ${m.orderIndex}: ${m.declared} -> ${m.correct} | "${m.text}"`));

// Parse quiz
const quizStart = content.indexOf('questions: [');
const quizEnd = content.indexOf('export const LESSON_PURSUIT_OF_HAPPYNESS');
const quizText = content.substring(quizStart, quizEnd);
const quizRefs = [...quizText.matchAll(/"?id"?:\s*"([^"]+)"[\s\S]*?"?referenceSegmentIndex"?:\s*(\d+)/g)];

console.log(`\nQuiz questions (${quizRefs.length}):`);
quizRefs.forEach(q => {
  const ref = parseInt(q[2]);
  const seg = segments[ref];
  console.log(`  ${q[1]}: ref=${ref} => "${seg ? seg.text.slice(0, 50) : 'OUT OF BOUNDS'}..."`);
});
