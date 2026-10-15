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

function migrateLesson(filePath, label) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Detect current orderIndex range
  const orderMatches = content.match(/"orderIndex":\s*(\d+)/g);
  if (!orderMatches) { console.log(`  SKIP: No orderIndex found`); return; }
  const indices = orderMatches.map(m => parseInt(m.match(/\d+/)[0]));
  const minIdx = Math.min(...indices);
  const maxIdx = Math.max(...indices);
  
  if (minIdx === 1) {
    console.log(`  ${label}: Already 1-indexed (1..${maxIdx}). Checking tokenCount only...`);
  }

  // STEP 1: Fix tokenCount
  const segBlocks = content.split(/\{\s*(?:"startTime"|"orderIndex"): /g).slice(1);
  let fixCount = 0;
  segBlocks.forEach(block => {
    const textMatch = block.match(/"text":\s*"([^"]+)"/);
    const tokenMatch = block.match(/"tokenCount":\s*(\d+)/);
    const pnMatch = block.match(/"properNouns":\s*(\[[^\]]*\])/);
    if (!textMatch || !tokenMatch) return;
    const text = textMatch[1];
    const declaredCount = parseInt(tokenMatch[1]);
    const properNouns = pnMatch ? JSON.parse(pnMatch[1]) : [];
    const tokens = tokenizeSentence(text, properNouns);
    if (tokens.length !== declaredCount) {
      const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`("text":\\s*"${escapedText}"[\\s\\S]*?"tokenCount":\\s*)${declaredCount}`);
      if (content.match(pattern)) {
        content = content.replace(pattern, `$1${tokens.length}`);
        fixCount++;
      }
    }
  });
  console.log(`  ${label} STEP 1: Fixed ${fixCount} tokenCount mismatches.`);

  // STEP 2: Migrate orderIndex if 0-indexed
  if (minIdx === 0) {
    for (let i = maxIdx; i >= 0; i--) {
      content = content.replace(new RegExp(`"orderIndex":\\s*${i}\\b`, 'g'), `"orderIndex": ${i + 1}`);
    }
    console.log(`  ${label} STEP 2: Migrated orderIndex 0..${maxIdx} → 1..${maxIdx + 1}.`);
  }

  // STEP 3: Update quiz refs (+1 if was 0-indexed)
  if (minIdx === 0) {
    const quizSectionStart = content.indexOf('questions"');
    const quizSectionEnd = content.indexOf('segments:');
    if (quizSectionStart !== -1 && quizSectionStart < quizSectionEnd) {
      const quizSection = content.substring(quizSectionStart, quizSectionEnd);
      let quizFixCount = 0;
      const fixedQuiz = quizSection.replace(/("referenceSegmentIndex":\s*)(\d+)/g, (match, prefix, idx) => {
        quizFixCount++;
        return `${prefix}${parseInt(idx) + 1}`;
      });
      content = content.substring(0, quizSectionStart) + fixedQuiz + content.substring(quizSectionEnd);
      console.log(`  ${label} STEP 3: Updated ${quizFixCount} quiz referenceSegmentIndex (+1).`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ${label}: DONE ✅`);
}

// ============== BATCH MIGRATE ==============
const LESSON_DIR = path.join(__dirname, '../features/listening/data/lessons/movies/sitcoms');

const lessons = [
  'lesson_the_office_jim_pranks.ts',
  'lesson_the_office_michael_scott.ts',
];

for (const file of lessons) {
  const filePath = path.join(LESSON_DIR, file);
  console.log(`\nMigrating: ${file}`);
  migrateLesson(filePath, file.replace('.ts', ''));
}
