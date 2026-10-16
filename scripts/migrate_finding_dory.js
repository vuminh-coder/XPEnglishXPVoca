const fs = require('fs');

const filePath = 'features/listening/data/lessons/movies/animation/lesson_finding_dory.ts';
let content = fs.readFileSync(filePath, 'utf8');

function tokenizeSentence(sentence, properNouns = []) {
  if (!sentence) return [];
  const normalizedPNDict = {};
  properNouns.forEach((pn) => {
    normalizedPNDict[pn.toLowerCase().trim()] = pn.trim();
  });
  const words = sentence.trim().split(/\s+/);
  return words
    .map((w, idx) => {
      const clean = w.replace(/^[^\w\s']+|[^\w\s']+$/g, '');
      const isPN = !!normalizedPNDict[clean.toLowerCase()];
      return {
        index: idx,
        text: w,
        clean,
        isProperNoun: isPN,
      };
    })
    .filter((t) => t.clean.length > 0);
}

// 1. Update quiz questions referenceSegmentIndex
const qMap = {
  q_mov_ani_09_1: 4,
  q_mov_ani_09_2: 1,
  q_mov_ani_09_3: 15,
  q_mov_ani_09_4: 18,
  q_mov_ani_09_5: 34,
  q_mov_ani_09_6: 41,
  q_mov_ani_09_7: 45,
  q_mov_ani_09_8: 49,
};

for (const [qId, newRef] of Object.entries(qMap)) {
  const regex = new RegExp(`("id":\\s*"${qId}"[\\s\\S]*?"referenceSegmentIndex":\\s*)\\d+`);
  if (!regex.test(content)) {
    console.error(`Could not find quiz question ${qId}`);
    process.exit(1);
  }
  content = content.replace(regex, `$1${newRef}`);
}
console.log('Quiz referenceSegmentIndex updated successfully.');

// 2. Parse and update segments
// Locate segments array
const segmentsStart = content.indexOf('segments: [');
if (segmentsStart === -1) {
  console.error('Could not find segments: [ in content');
  process.exit(1);
}

const beforeSegments = content.slice(0, segmentsStart + 'segments: ['.length);
const rest = content.slice(segmentsStart + 'segments: ['.length);

// Extract each segment block
const segBlocks = [];
let braceDepth = 0;
let inSegment = false;
let currentBlock = '';
let afterSegmentsIndex = -1;

for (let i = 0; i < rest.length; i++) {
  const char = rest[i];
  if (char === '{') {
    braceDepth++;
    if (braceDepth === 1) {
      inSegment = true;
      currentBlock = '{';
      continue;
    }
  }
  if (inSegment) {
    currentBlock += char;
    if (char === '}') {
      braceDepth--;
      if (braceDepth === 0) {
        segBlocks.push(currentBlock);
        inSegment = false;
        currentBlock = '';
      }
    }
  } else if (char === ']' && braceDepth === 0) {
    afterSegmentsIndex = i;
    break;
  }
}

if (afterSegmentsIndex === -1) {
  console.error('Could not find closing bracket of segments');
  process.exit(1);
}

const afterSegments = rest.slice(afterSegmentsIndex);
console.log(`Found ${segBlocks.length} segment blocks.`);

const updatedBlocks = segBlocks.map((block, idx) => {
  const newOrderIndex = idx + 1;
  
  // Extract text and properNouns to compute accurate tokenCount
  const textMatch = block.match(/"text":\s*"((?:\\.|[^"\\])*)"/);
  const properNounsMatch = block.match(/"properNouns":\s*(\[[^\]]*\])/);
  
  if (!textMatch) {
    console.error(`Failed to match text in block ${idx}`);
    process.exit(1);
  }
  
  const text = textMatch[1].replace(/\\"/g, '"');
  let properNouns = [];
  if (properNounsMatch) {
    try {
      properNouns = JSON.parse(properNounsMatch[1]);
    } catch (e) {
      properNouns = eval(properNounsMatch[1]);
    }
  }
  
  const correctTokenCount = tokenizeSentence(text, properNouns).length;
  
  // Replace orderIndex
  let updatedBlock = block.replace(/"orderIndex":\s*\d+/, `"orderIndex": ${newOrderIndex}`);
  // Replace tokenCount
  updatedBlock = updatedBlock.replace(/"tokenCount":\s*\d+/, `"tokenCount": ${correctTokenCount}`);
  
  return updatedBlock;
});

const newContent = beforeSegments + '\n    ' + updatedBlocks.join(',\n    ') + '\n  ' + afterSegments;

fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`Successfully migrated ${filePath} to 1-indexed Master standard!`);
