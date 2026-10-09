import fs from "fs";

let content = fs.readFileSync("README.md", "utf8");
const isCrlf = content.includes("\r\n");
const lineSep = isCrlf ? "\r\n" : "\n";
const lines = content.split(lineSep);

const targetSnippet = "lesson_ted_bilingual_brain.ts";
const replacement = "      6. [lesson_ted_bilingual_brain.ts](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_ted_bilingual_brain.ts): LESSON_TED_BILINGUAL_BRAIN – TED-Ed: The Benefits of a Bilingual Brain (18 phân đoạn, 126s, MMmOLN5zBLY) – Dò sát 100% phụ đề YouTube gốc (288/288 từ, 0 diffs). Test: [__tests__/ted_bilingual_verbatim.test.ts](file:///e:/XP%20English%20%20XP%20Voca/__tests__/ted_bilingual_verbatim.test.ts). Screenshot: [public/dictation_lesson_6_deep_audit.png](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_lesson_6_deep_audit.png).";

let replacedCount = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes(targetSnippet) && !lines[i].includes("Dò sát 100%")) {
    lines[i] = replacement;
    replacedCount++;
  }
}

fs.writeFileSync("README.md", lines.join(lineSep), "utf8");
console.log(`✅ Replaced ${replacedCount} occurrences of lesson_ted_bilingual_brain in README.md!`);
