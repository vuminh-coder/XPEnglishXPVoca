import fs from "fs";

let content = fs.readFileSync("README.md", "utf8");
const isCrlf = content.includes("\r\n");
const lineSep = isCrlf ? "\r\n" : "\n";
const lines = content.split(lineSep);

const targetSnippet = "lesson_daily_pets.ts";
const replacement = "      3. [lesson_daily_pets.ts](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_daily_pets.ts): LESSON_DAILY_PETS – Daily English: Pets, Animals & Nature Conversation (11 phân đoạn, 72s, AK42GhbTZ9w) – Dò sát 100% phụ đề YouTube gốc (114/114 từ, 0 diffs). Test: [__tests__/pets_verbatim.test.ts](file:///e:/XP%20English%20%20XP%20Voca/__tests__/pets_verbatim.test.ts). Screenshot: [public/dictation_lesson_3_deep_audit.png](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_lesson_3_deep_audit.png).";

let replacedCount = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes(targetSnippet) && !lines[i].includes("Dò sát 100%")) {
    lines[i] = replacement;
    replacedCount++;
  }
}

fs.writeFileSync("README.md", lines.join(lineSep), "utf8");
console.log(`✅ Replaced ${replacedCount} occurrences in README.md!`);
