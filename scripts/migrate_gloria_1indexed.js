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

// ============== CONFIG ==============
const LESSON_FILE = 'lesson_modern_family_gloria.ts';
const LESSON_DIR = path.join(__dirname, '../features/listening/data/lessons/movies/sitcoms');
const filePath = path.join(LESSON_DIR, LESSON_FILE);
const MAX_ORDER_INDEX = 73; // 0..73 -> 74 segments
// ====================================

let content = fs.readFileSync(filePath, 'utf-8');

// ============================================================
// STEP 1: Fix all tokenCount mismatches
// ============================================================
const startIdx = content.indexOf('segments: [');
const endIdx = content.lastIndexOf('],');
const segsJson = content.substring(startIdx + 10, endIdx + 1);
const segments = eval(segsJson);

let fixCount = 0;
segments.forEach((s) => {
  const tokens = tokenizeSentence(s.text, s.properNouns || []);
  if (tokens.length !== s.tokenCount) {
    const escapedText = s.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(
      `("text":\\s*"${escapedText}"[\\s\\S]*?"tokenCount":\\s*)${s.tokenCount}`,
    );
    const match = content.match(pattern);
    if (match) {
      content = content.replace(pattern, `$1${tokens.length}`);
      fixCount++;
    } else {
      console.log(`WARNING: Could not fix seg ${s.orderIndex}: "${s.text}" (${s.tokenCount} -> ${tokens.length})`);
    }
  }
});
console.log(`STEP 1: Fixed ${fixCount} tokenCount mismatches.`);

// ============================================================
// STEP 2: Migrate orderIndex 0..N → 1..N+1 (reverse loop)
// ============================================================
for (let i = MAX_ORDER_INDEX; i >= 0; i--) {
  content = content.replace(new RegExp(`"orderIndex":\\s*${i}\\b`, 'g'), `"orderIndex": ${i + 1}`);
}
console.log(`STEP 2: Migrated orderIndex to 1-indexed (1..${MAX_ORDER_INDEX + 1}).`);

// ============================================================
// STEP 3: Update quiz referenceSegmentIndex
// Current refs are 0-indexed but we need to verify if they're correct or wrong
// Simply add +1 to each since they were presumably correct 0-indexed
// ============================================================
const quizRefPattern = /("referenceSegmentIndex":\s*)(\d+)/g;
let quizFixCount = 0;
// We need to only fix refs in the quiz section, not in segments
const quizSectionStart = content.indexOf('questions":');
const quizSectionEnd = content.indexOf('segments:');
if (quizSectionStart < quizSectionEnd) {
  const quizSection = content.substring(quizSectionStart, quizSectionEnd);
  const fixedQuizSection = quizSection.replace(quizRefPattern, (match, prefix, idx) => {
    quizFixCount++;
    return `${prefix}${parseInt(idx) + 1}`;
  });
  content = content.substring(0, quizSectionStart) + fixedQuizSection + content.substring(quizSectionEnd);
}
console.log(`STEP 3: Fixed ${quizFixCount} quiz referenceSegmentIndex values (+1).`);

// ============================================================
// STEP 4: Save file
// ============================================================
fs.writeFileSync(filePath, content, 'utf-8');
console.log('\nMigration completed! File saved.');
