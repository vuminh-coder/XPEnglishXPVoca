const fs = require('fs');

const filePath = 'features/listening/data/lessons/movies/animation/lesson_tangled.ts';
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
  q_mov_ani_10_1: 3,
  q_mov_ani_10_2: 15,
  q_mov_ani_10_3: 21,
  q_mov_ani_10_4: 33,
  q_mov_ani_10_5: 43,
  q_mov_ani_10_6: 47,
  q_mov_ani_10_7: 42,
  q_mov_ani_10_8: 50,
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
const segmentsStart = content.indexOf('segments: [');
if (segmentsStart === -1) {
  console.error('Could not find segments: [ in content');
  process.exit(1);
}

const beforeSegments = content.slice(0, segmentsStart + 'segments: ['.length);
const rest = content.slice(segmentsStart + 'segments: ['.length);

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

let afterSegments = rest.slice(afterSegmentsIndex);
console.log(`Found ${segBlocks.length} segment blocks.`);

const updatedBlocks = segBlocks.map((block, idx) => {
  const newOrderIndex = idx + 1;
  let currentBlockContent = block;

  // Clean merged separator in segment 38 (index 38)
  if (idx === 38) {
    currentBlockContent = currentBlockContent
      .replace('So, I have made the decision to trust you. — A horrible decision, really.', 'So, I have made the decision to trust you. A horrible decision, really.')
      .replace('/soʊ, aɪ hæv meɪd ðə dɪˈsɪʒən tuː trʌst juː. — ə ˈhɔːrəbəl dɪˈsɪʒən, ˈrɪəli./', '/soʊ, aɪ hæv meɪd ðə dɪˈsɪʒən tuː trʌst juː. ə ˈhɔːrəbəl dɪˈsɪʒən, ˈrɪəli./')
      .replace('Vì thế, ta đã đưa ra quyết định đặt niềm tin vào ngươi. — Một quyết định cực kỳ tồi tệ, thật đấy.', 'Vì thế, ta đã đưa ra quyết định đặt niềm tin vào ngươi. Một quyết định cực kỳ tồi tệ, thật đấy.');
  }
  
  // Extract text and properNouns to compute accurate tokenCount
  const textMatch = currentBlockContent.match(/"text":\s*"((?:\\.|[^"\\])*)"/);
  const properNounsMatch = currentBlockContent.match(/"properNouns":\s*(\[[^\]]*\])/);
  
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
  let updatedBlock = currentBlockContent.replace(/"orderIndex":\s*\d+/, `"orderIndex": ${newOrderIndex}`);
  // Replace tokenCount
  updatedBlock = updatedBlock.replace(/"tokenCount":\s*\d+/, `"tokenCount": ${correctTokenCount}`);
  
  return updatedBlock;
});

// Check if export default is present in afterSegments
if (!afterSegments.includes('export default LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT;')) {
  afterSegments += '\n\nexport default LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT;\n';
}

const newContent = beforeSegments + '\n    ' + updatedBlocks.join(',\n    ') + '\n  ' + afterSegments;

fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`Successfully migrated ${filePath} to 1-indexed Master standard!`);
