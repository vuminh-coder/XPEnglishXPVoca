import { MOCK_LESSONS_DATA } from "../lib/data/listeningMockData";

console.log("=== VERIFYING ALL 100+ LESSONS IN MOCK_LESSONS_DATA ===");
console.log("Total Lessons Count:", MOCK_LESSONS_DATA.length);

let shortCount = 0;
let totalSentences = 0;

MOCK_LESSONS_DATA.forEach((lesson, i) => {
  const len = lesson.transcript ? lesson.transcript.length : 0;
  totalSentences += len;
  if (len < 12) shortCount++;
});

console.log("--------------------------------------------------");
console.log("✅ Total Lessons in System:", MOCK_LESSONS_DATA.length);
console.log("✅ Lessons with >= 12 Sentences:", MOCK_LESSONS_DATA.length - shortCount);
console.log("❌ Short Lessons (< 12 Sentences):", shortCount);
console.log("📊 Average Sentences per Lesson:", (totalSentences / MOCK_LESSONS_DATA.length).toFixed(1));
console.log("--------------------------------------------------");
