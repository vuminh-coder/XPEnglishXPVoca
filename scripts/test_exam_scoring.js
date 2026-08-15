function convertToeicListeningRawToScaled(rawCorrect) {
  if (rawCorrect <= 0) return 5;
  if (rawCorrect >= 96) return 495;
  return Math.min(495, Math.max(5, Math.round(rawCorrect * 4.9 + 15)));
}

function convertToeicReadingRawToScaled(rawCorrect) {
  if (rawCorrect <= 0) return 5;
  if (rawCorrect >= 97) return 495;
  return Math.min(495, Math.max(5, Math.round(rawCorrect * 4.8 + 10)));
}

function convertIeltsRawToBandScore(rawCorrect) {
  if (rawCorrect <= 3) return 1.0;
  if (rawCorrect <= 5) return 2.5;
  if (rawCorrect <= 9) return 3.5;
  if (rawCorrect <= 12) return 4.5;
  if (rawCorrect <= 15) return 5.0;
  if (rawCorrect <= 19) return 5.5;
  if (rawCorrect <= 22) return 6.0;
  if (rawCorrect <= 26) return 6.5;
  if (rawCorrect <= 29) return 7.0;
  if (rawCorrect <= 32) return 7.5;
  if (rawCorrect <= 34) return 8.0;
  if (rawCorrect <= 36) return 8.5;
  return 9.0;
}

console.log("🧪 Running Multi-Skill Exam Scoring Engine Unit Tests...\n");

// Test 1: TOEIC Listening & Reading Scaled Scores
const listening100 = convertToeicListeningRawToScaled(100);
const reading100 = convertToeicReadingRawToScaled(100);
console.log(`✅ Test 1: TOEIC 100/100 Listening = ${listening100}, 100/100 Reading = ${reading100} (Total Max 990)`);
if (listening100 + reading100 !== 990) {
  console.error("FAILED Test 1");
  process.exit(1);
}

// Test 2: IELTS Band Score
const ielts32 = convertIeltsRawToBandScore(32);
console.log(`✅ Test 2: IELTS 32/40 raw = Band ${ielts32} (Expected Band 7.5)`);
if (ielts32 !== 7.5) {
  console.error("FAILED Test 2");
  process.exit(1);
}

console.log("\n🎉 ALL MULTI-SKILL SCORING TESTS PASSED 100% SUCCESSFULLY!");
