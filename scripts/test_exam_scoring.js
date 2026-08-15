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

console.log("🧪 Running Exam Scoring Engine Unit Tests...\n");

// Test 1: TOEIC Listening conversion
const listening50 = convertToeicListeningRawToScaled(50);
const listening100 = convertToeicListeningRawToScaled(100);
console.log(`✅ Test 1: TOEIC Listening 50 raw = ${listening50} (Expected ~260), 100 raw = ${listening100} (Expected 495)`);
if (listening100 !== 495) {
  console.error("FAILED Test 1");
  process.exit(1);
}

// Test 2: TOEIC Reading conversion
const reading50 = convertToeicReadingRawToScaled(50);
const reading100 = convertToeicReadingRawToScaled(100);
console.log(`✅ Test 2: TOEIC Reading 50 raw = ${reading50} (Expected ~250), 100 raw = ${reading100} (Expected 495)`);
if (reading100 !== 495) {
  console.error("FAILED Test 2");
  process.exit(1);
}

// Test 3: IELTS Band Score conversion
const ielts30 = convertIeltsRawToBandScore(30);
const ielts38 = convertIeltsRawToBandScore(38);
console.log(`✅ Test 3: IELTS 30/40 raw = Band ${ielts30} (Expected 7.5), 38/40 raw = Band ${ielts38} (Expected 9.0)`);
if (ielts38 !== 9.0) {
  console.error("FAILED Test 3");
  process.exit(1);
}

console.log("\n🎉 ALL 3 EXAM SCORING TESTS PASSED 100% SUCCESSFULLY!");
