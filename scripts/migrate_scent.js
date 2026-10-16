const fs = require('fs');
const path = require('path');

function tokenizeStandard(sentence, properNouns = []) {
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

const filePath = path.join(__dirname, '../features/listening/data/lessons/movies/inspirational/lesson_scent_of_a_woman.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Parse segments
const segStart = content.indexOf('segments: [');
const segEnd = content.lastIndexOf('],');
const segments = eval(content.substring(segStart + 10, segEnd + 1));
console.log(`Parsed ${segments.length} segments.`);

// Update referenceSegmentIndex in Quiz
const quizStart = content.indexOf('export const QUIZ_SCENT_OF_A_WOMAN');
const quizEnd = content.indexOf('export const LESSON_SCENT_OF_A_WOMAN');
let quizText = content.substring(quizStart, quizEnd);

quizText = quizText.replace(/"referenceSegmentIndex":\s*(\d+)/g, (match, p1) => {
  const oldRef = parseInt(p1);
  const newRef = oldRef + 1;
  console.log(`Quiz ref updated: ${oldRef} -> ${newRef}`);
  return `"referenceSegmentIndex": ${newRef}`;
});

content = content.substring(0, quizStart) + quizText + content.substring(quizEnd);

// Update segments:
let segsBlock = content.substring(content.indexOf('segments: [') + 10, content.lastIndexOf('],') + 1);

// 1. Update orderIndex in reverse order
for (let i = segments.length - 1; i >= 0; i--) {
  const seg = segments[i];
  const oldIdx = seg.orderIndex; // 0..61
  const newIdx = oldIdx + 1; // 1..62

  const oldOrderPattern = new RegExp(`(["']?orderIndex["']?\\s*:\\s*)${oldIdx}(\\s*,)`, 'g');
  segsBlock = segsBlock.replace(oldOrderPattern, `$1${newIdx}$2`);
}

// 2. Update token counts
for (let i = 0; i < segments.length; i++) {
  const seg = segments[i];
  const newIdx = i + 1;
  const correctTokens = tokenizeStandard(seg.text, seg.properNouns || []).length;
  
  const segRegex = new RegExp(`(["']?orderIndex["']?\\s*:\\s*${newIdx}\\b[\\s\\S]*?)(["']?tokenCount["']?\\s*:\\s*)\\d+([\\s\\S]*?)(?=\\{|$)`);
  segsBlock = segsBlock.replace(segRegex, (match, prefix, tcPrefix, suffix) => {
    return `${prefix}${tcPrefix}${correctTokens}${suffix}`;
  });
}

// Put back into content
const beforeSegs = content.substring(0, content.indexOf('segments: [') + 10);
const afterSegs = content.substring(content.lastIndexOf('],') + 1);
content = beforeSegs + segsBlock + afterSegs;

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully updated lesson_scent_of_a_woman.ts');
