import fs from "fs";

let content = fs.readFileSync("README.md", "utf8");
const isCrlf = content.includes("\r\n");
const lineSep = isCrlf ? "\r\n" : "\n";
const lines = content.split(lineSep);

const targetSnippet = "lesson_bbc_sunken_ship.ts";
const replacement = "      4. [lesson_bbc_sunken_ship.ts](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_bbc_sunken_ship.ts): LESSON_BBC_SUNKEN_SHIP – BBC Learning English: Kho báu 20 tỷ USD tàu đắm San Jose (13 phân đoạn, 90s, doOlP7NLUwc) – Dò sát 100% phụ đề YouTube gốc (203/203 từ, 0 diffs). Test: [__tests__/bbc_verbatim.test.ts](file:///e:/XP%20English%20%20XP%20Voca/__tests__/bbc_verbatim.test.ts). Screenshot: [public/dictation_lesson_4_deep_audit.png](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_lesson_4_deep_audit.png).";

let replacedCount = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes(targetSnippet) && !lines[i].includes("Dò sát 100%")) {
    lines[i] = replacement;
    replacedCount++;
  }
}

fs.writeFileSync("README.md", lines.join(lineSep), "utf8");
console.log(`✅ Replaced ${replacedCount} occurrences of lesson_bbc_sunken_ship in README.md!`);
