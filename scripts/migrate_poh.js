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

const filePath = path.join(__dirname, '../features/listening/data/lessons/movies/inspirational/lesson_pursuit_of_happyness.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Parse segments to compute correct token counts
const segStart = content.indexOf('segments: [');
const segEnd = content.lastIndexOf('],');
const segments = eval(content.substring(segStart + 10, segEnd + 1));
console.log(`Parsed ${segments.length} segments.`);

// Update referenceSegmentIndex in Quiz
const refMap = {
  13: 14,
  50: 51,
  14: 15,
  56: 57,
  44: 45,
  47: 48,
  64: 65,
  68: 69
};

// We will update the quiz block explicitly
const quizStart = content.indexOf('export const QUIZ_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS');
const quizEnd = content.indexOf('export const LESSON_PURSUIT_OF_HAPPYNESS_BASKETBALL_HAPPINESS');
let quizText = content.substring(quizStart, quizEnd);

// Replace referenceSegmentIndex in quizText
quizText = quizText.replace(/"referenceSegmentIndex":\s*(\d+)/g, (match, p1) => {
  const oldRef = parseInt(p1);
  const newRef = oldRef + 1;
  console.log(`Quiz ref updated: ${oldRef} -> ${newRef}`);
  return `"referenceSegmentIndex": ${newRef}`;
});

content = content.substring(0, quizStart) + quizText + content.substring(quizEnd);

// Now update segments:
// 1. First update tokenCounts
// To update tokenCount accurately per segment, we can parse each segment block
let segsBlock = content.substring(content.indexOf('segments: [') + 10, content.lastIndexOf('],') + 1);

// We can replace tokenCount in each segment
// Let's iterate through segments
for (let i = segments.length - 1; i >= 0; i--) {
  const seg = segments[i];
  const oldIdx = seg.orderIndex; // 0..79
  const newIdx = oldIdx + 1; // 1..80
  const correctTokens = tokenizeStandard(seg.text, seg.properNouns || []).length;

  // Replace orderIndex in reverse order to avoid collisions
  // Match either "orderIndex": oldIdx or orderIndex: oldIdx
  const oldOrderPattern = new RegExp(`(["']?orderIndex["']?\\s*:\\s*)${oldIdx}(\\s*,)`, 'g');
  segsBlock = segsBlock.replace(oldOrderPattern, `$1${newIdx}$2`);
}

// Now replace token counts for each segment based on new orderIndex 1..80
for (let i = 0; i < segments.length; i++) {
  const seg = segments[i];
  const newIdx = i + 1;
  const correctTokens = tokenizeStandard(seg.text, seg.properNouns || []).length;
  
  // Find segment block by orderIndex: newIdx
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
console.log('Successfully updated lesson_pursuit_of_happyness.ts');
