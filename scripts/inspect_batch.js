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

// ============== GENERIC LESSON INSPECTOR ==============
const lessons = [
  { file: 'lesson_the_office_jim_pranks.ts', id: 'mov_sit_05' },
  { file: 'lesson_the_office_michael_scott.ts', id: 'mov_sit_06' },
];

const LESSON_DIR = path.join(__dirname, '../features/listening/data/lessons/movies/sitcoms');

for (const lesson of lessons) {
  const filePath = path.join(LESSON_DIR, lesson.file);
  const content = fs.readFileSync(filePath, 'utf-8');

  const orderMatches = content.match(/"orderIndex":\s*(\d+)/g);
  const indices = orderMatches ? orderMatches.map(m => parseInt(m.match(/\d+/)[0])) : [];
  const min = indices.length ? Math.min(...indices) : -1;
  const max = indices.length ? Math.max(...indices) : -1;

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

  const quizRefs = [...content.matchAll(/"referenceSegmentIndex":\s*(\d+)/g)];

  console.log(`\n=== ${lesson.id} (${lesson.file}) ===`);
  console.log(`  Segments: ${indices.length}, Range: ${min}..${max}, ${min === 0 ? '0-INDEXED' : '1-INDEXED'}`);
  console.log(`  TokenCount mismatches: ${mismatches}`);
  console.log(`  Quiz refs: ${quizRefs.map(m => m[1]).join(', ')}`);
}
