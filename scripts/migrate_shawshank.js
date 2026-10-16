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

const filePath = path.join(__dirname, '../features/listening/data/lessons/movies/inspirational/lesson_shawshank_redemption.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Parse segments
const segStart = content.indexOf('segments: [');
const segEnd = content.lastIndexOf('],');
const segments = eval(content.substring(segStart + 10, segEnd + 1));
console.log(`Original parsed segments count: ${segments.length}`);

// Build new segments array
const newSegments = [];
for (let i = 0; i < segments.length; i++) {
  const seg = segments[i];
  if (seg.orderIndex === 25 && seg.text.includes('—')) {
    // Split into 2 segments
    const segA = {
      orderIndex: 26,
      startTime: 1664.0,
      endTime: 1666.5,
      text: "What are you talking about?",
      translationVi: "Cậu đang nói về cái gì thế?",
      ipaUs: "/wʌt ɑːr juː ˈtɔːkɪŋ əˈbaʊt?/",
      keywords: ["talking about"],
      explanationAi: "Red hoang mang hỏi lại khi Andy nhắc đến một nơi tự do nội tâm không xây bằng đá.",
      properNouns: [],
      tokenCount: tokenizeStandard("What are you talking about?").length
    };
    const segB = {
      orderIndex: 27,
      startTime: 1666.6,
      endTime: 1668.5,
      text: "Hope.",
      translationVi: "Hy vọng.",
      ipaUs: "/hoʊp./",
      keywords: ["hope"],
      explanationAi: "Từ khóa cốt lõi của tác phẩm được Andy cất lên khẳng khái trong cuộc đối thoại.",
      properNouns: [],
      tokenCount: tokenizeStandard("Hope.").length
    };
    newSegments.push(segA, segB);
  } else if (seg.orderIndex < 25) {
    seg.orderIndex = seg.orderIndex + 1; // 1..25
    seg.tokenCount = tokenizeStandard(seg.text, seg.properNouns || []).length;
    newSegments.push(seg);
  } else {
    // seg.orderIndex > 25
    seg.orderIndex = seg.orderIndex + 2; // 28..51
    seg.tokenCount = tokenizeStandard(seg.text, seg.properNouns || []).length;
    newSegments.push(seg);
  }
}

console.log(`New segments count: ${newSegments.length}`);
console.log(`First segment orderIndex: ${newSegments[0].orderIndex}`);
console.log(`Last segment orderIndex: ${newSegments[newSegments.length - 1].orderIndex}`);

// Format new segments as clean typescript code
function formatSegments(segs) {
  return segs.map(s => {
    return `    {
        "orderIndex": ${s.orderIndex},
        "startTime": ${s.startTime},
        "endTime": ${s.endTime},
        "text": ${JSON.stringify(s.text)},
        "translationVi": ${JSON.stringify(s.translationVi)},
        "ipaUs": ${JSON.stringify(s.ipaUs)},
        "keywords": ${JSON.stringify(s.keywords, null, 12).replace(/\n\s*/g, ' ')},
        "explanationAi": ${JSON.stringify(s.explanationAi)},
        "properNouns": ${JSON.stringify(s.properNouns, null, 12).replace(/\n\s*/g, ' ')},
        "tokenCount": ${s.tokenCount}
    }`;
  }).join(',\n');
}

// Update Quiz references
const quizStart = content.indexOf('export const QUIZ_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC');
const quizEnd = content.indexOf('export const LESSON_SHAWSHANK_REDEMPTION_GET_BUSY_LIVING_PACIFIC');
let quizText = content.substring(quizStart, quizEnd);

const quizRefMap = {
  1: 2,
  16: 17,
  20: 21,
  26: 28,
  29: 31,
  33: 35,
  36: 38,
  41: 43
};

quizText = quizText.replace(/"referenceSegmentIndex":\s*(\d+)/g, (match, p1) => {
  const oldRef = parseInt(p1);
  const newRef = quizRefMap[oldRef];
  console.log(`Quiz ref updated: ${oldRef} -> ${newRef}`);
  return `"referenceSegmentIndex": ${newRef}`;
});

content = content.substring(0, quizStart) + quizText + content.substring(quizEnd);

// Replace segments block in content
const beforeSegs = content.substring(0, content.indexOf('segments: [') + 11) + '\n';
const afterSegs = '\n' + content.substring(content.lastIndexOf('],'));
content = beforeSegs + formatSegments(newSegments) + afterSegs;

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully updated lesson_shawshank_redemption.ts');
