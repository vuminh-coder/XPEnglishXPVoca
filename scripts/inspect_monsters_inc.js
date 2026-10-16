const fs = require('fs');

const filePath = 'features/listening/data/lessons/movies/animation/lesson_monsters_inc.ts';
const content = fs.readFileSync(filePath, 'utf8');

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

// Check segments
let segmentsStart = content.indexOf('segments: [');
if (segmentsStart === -1) {
  segmentsStart = content.indexOf('"segments": [');
}
if (segmentsStart === -1) {
  console.log('No segments: [ found!');
  process.exit(1);
}

const segmentsRaw = content.slice(segmentsStart);
const segBlocks = [];
let braceDepth = 0;
let inSegment = false;
let currentBlock = '';

for (let i = segmentsRaw.indexOf('['); i < segmentsRaw.length; i++) {
  const char = segmentsRaw[i];
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
    break;
  }
}

console.log(`Parsed ${segBlocks.length} segment blocks.`);

let tokenMismatches = [];
let mergedUtterances = [];
let orderIndices = [];
let segMap = {};

segBlocks.forEach((block, idx) => {
  const orderMatch = block.match(/"?orderIndex"?:\s*(\d+)/);
  const textMatch = block.match(/"?text"?:\s*"((?:\\.|[^"\\])*)"/);
  const tokenMatch = block.match(/"?tokenCount"?:\s*(\d+)/);
  const properNounsMatch = block.match(/"?properNouns"?:\s*(\[[^\]]*\])/);

  if (!orderMatch || !textMatch || !tokenMatch) {
    console.log(`Failed block ${idx}`);
    return;
  }

  const orderIndex = parseInt(orderMatch[1]);
  const text = textMatch[1].replace(/\\"/g, '"');
  const tokenCount = parseInt(tokenMatch[1]);
  let properNouns = [];
  if (properNounsMatch) {
    try {
      properNouns = JSON.parse(properNounsMatch[1]);
    } catch (e) {
      properNouns = eval(properNounsMatch[1]);
    }
  }

  orderIndices.push(orderIndex);
  segMap[orderIndex] = text;

  const actualTokens = tokenizeSentence(text, properNouns);
  if (actualTokens.length !== tokenCount) {
    tokenMismatches.push({
      orderIndex,
      text,
      declared: tokenCount,
      actual: actualTokens.length
    });
  }

  if (text.includes('—') || text.includes(' - ') || text.includes('---')) {
    mergedUtterances.push({ orderIndex, text });
  }
});

console.log(`Min orderIndex: ${Math.min(...orderIndices)}, Max orderIndex: ${Math.max(...orderIndices)}`);
console.log(`Token mismatches count: ${tokenMismatches.length}`);
if (tokenMismatches.length > 0) {
  console.log('Sample token mismatches:', tokenMismatches.slice(0, 10));
}
console.log(`Possible merged utterances count: ${mergedUtterances.length}`);
if (mergedUtterances.length > 0) {
  console.log('Possible merged utterances:', mergedUtterances);
}

// Check quiz questions
const quizRegex = /"?referenceSegmentIndex"?:\s*(\d+)/g;
let quizRefs = [];
let qMatch;
while ((qMatch = quizRegex.exec(content)) !== null) {
  quizRefs.push(parseInt(qMatch[1]));
}
console.log(`Quiz questions referenceSegmentIndices (${quizRefs.length}):`, quizRefs);
quizRefs.forEach((ref, idx) => {
  console.log(`Q${idx + 1} (ref ${ref}): "${segMap[ref]}"`);
});
