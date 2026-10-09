import fs from "fs";
import { LESSON_BBC_WHY_WE_LAUGH } from "../features/listening/data/lessons/lesson_bbc_why_we_laugh";

const sub = JSON.parse(fs.readFileSync("scripts/bbc_laughter_medicine.en-GB.json3", "utf8"));

function cleanWords(s: string): string[] {
  return s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/--/g, " ")
    .replace(/—/g, " ")
    .replace(/['"]+/g, "")
    .replace(/[?¿!,.:;]+/g, " ")
    .split(/\s+/)
    .map((w) => w.trim().toLowerCase())
    .filter(Boolean);
}

// Events 0 to 58 strictly correspond to Segments 1..18
const eventsInRange = sub.events.slice(0, 59);

const offText = eventsInRange
  .map((e: any) => (e.segs || []).map((s: any) => s.utf8).join(""))
  .join(" ")
  .replace(/\n/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const offWords = cleanWords(offText);
const lessonWords: string[] = [];
LESSON_BBC_WHY_WE_LAUGH.segments.forEach((s) => lessonWords.push(...cleanWords(s.text)));

console.log("Official events count (Events 0..58):", eventsInRange.length);
console.log("Official words:", offWords.length);
console.log("Lesson words:", lessonWords.length);

let diffs = 0;
for (let i = 0; i < Math.max(offWords.length, lessonWords.length); i++) {
  if (offWords[i] !== lessonWords[i]) {
    diffs++;
    console.log(`Diff at ${i}: Official="${offWords[i]}" vs Lesson="${lessonWords[i]}"`);
  }
}
console.log(`Total diffs: ${diffs}`);
