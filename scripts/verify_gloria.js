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

const LESSON_FILE = 'lesson_modern_family_gloria.ts';
const filePath = path.join(__dirname, '../features/listening/data/lessons/movies/sitcoms', LESSON_FILE);
const content = fs.readFileSync(filePath, 'utf-8');

const orderMatches = content.match(/"orderIndex":\s*(\d+)/g);
const indices = orderMatches.map(m => parseInt(m.match(/\d+/)[0]));
console.log('Total segments:', orderMatches.length);
console.log('Min:', Math.min(...indices), 'Max:', Math.max(...indices));

// Check tokenCount
const segBlocks = content.split(/\{\s*(?:"startTime"|"orderIndex"): /g).slice(1);
let mismatches = 0;
segBlocks.forEach(block => {
  const textMatch = block.match(/"text":\s*"([^"]+)"/);
  const tokenMatch = block.match(/"tokenCount":\s*(\d+)/);
  const pnMatch = block.match(/"properNouns":\s*(\[[^\]]*\])/);
  if (!textMatch || !tokenMatch) return;
  const tokens = tokenizeSentence(textMatch[1], pnMatch ? JSON.parse(pnMatch[1]) : []);
  if (tokens.length !== parseInt(tokenMatch[1])) mismatches++;
});
console.log('TokenCount mismatches:', mismatches);

// Check quiz refs
const quizRefs = [...content.matchAll(/"referenceSegmentIndex":\s*(\d+)/g)];
console.log('Quiz refs:', quizRefs.map(m => m[1]).join(', '));
