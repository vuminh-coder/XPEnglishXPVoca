import fs from "fs";
import { LESSON_DAILY_PETS } from "../features/listening/data/lessons/lesson_daily_pets";

const sub = JSON.parse(fs.readFileSync("scripts/pets_official.en.json3", "utf8"));
const rawText = sub.events
  .filter((e: any) => e.segs)
  .map((e: any) => e.segs.map((s: any) => s.utf8).join(""))
  .join(" ")
  .replace(/\n/g, " ")
  .replace(/\s+/g, " ")
  .trim();

function cleanWords(s: string): string[] {
  return s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/--/g, " ")
    .replace(/—/g, " ")
    .replace(/['"]+/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .map((w) => w.trim().toLowerCase())
    .filter(Boolean);
}

const officialWords = cleanWords(rawText);
const lessonWords: string[] = [];
LESSON_DAILY_PETS.segments.forEach((s) => lessonWords.push(...cleanWords(s.text)));

console.log("Official YouTube subtitles words count:", officialWords.length);
console.log("Lesson segments words count           :", lessonWords.length);

let diffs = 0;
for (let i = 0; i < Math.max(officialWords.length, lessonWords.length); i++) {
  const ow = officialWords[i] || "<missing>";
  const lw = lessonWords[i] || "<missing>";
  if (ow !== lw) {
    console.log(`Diff at index ${i}: Official="${ow}" vs Lesson="${lw}"`);
    diffs++;
  }
}

if (diffs === 0) {
  console.log(`🎉 PERFECT 100% VERBATIM MATCH! 0 diffs across all ${officialWords.length} words!`);
} else {
  console.log(`Found ${diffs} differences.`);
}
