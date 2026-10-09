import fs from "fs";

let content = fs.readFileSync("README.md", "utf8");
const isCrlf = content.includes("\r\n");
const lineSep = isCrlf ? "\r\n" : "\n";
const lines = content.split(lineSep);

const targetSnippet = "lesson_steve_jobs.ts";
const replacement = "      5. [lesson_steve_jobs.ts](file:///e:/XP%20English%20%20XP%20Voca/features/listening/data/lessons/lesson_steve_jobs.ts): LESSON_STEVE_JOBS – Steve Jobs: Stanford Commencement Address (18 phân đoạn, 173s, UF8uR6Z6KLc) – Dò sát 100% phụ đề YouTube gốc (388/388 từ, 0 diffs). Test: [__tests__/steve_jobs_verbatim.test.ts](file:///e:/XP%20English%20%20XP%20Voca/__tests__/steve_jobs_verbatim.test.ts). Screenshot: [public/dictation_lesson_5_deep_audit.png](file:///e:/XP%20English%20%20XP%20Voca/public/dictation_lesson_5_deep_audit.png).";

let replacedCount = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes(targetSnippet) && !lines[i].includes("Dò sát 100%")) {
    lines[i] = replacement;
    replacedCount++;
  }
}

fs.writeFileSync("README.md", lines.join(lineSep), "utf8");
console.log(`✅ Replaced ${replacedCount} occurrences of lesson_steve_jobs in README.md!`);
