import fs from "fs";
import { LESSON_TED_BILINGUAL_BRAIN } from "../features/listening/data/lessons/lesson_ted_bilingual_brain";

const sub = JSON.parse(fs.readFileSync("scripts/ted_bilingual_raw.en.json3", "utf8"));

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

// Events 0 to 35 strictly correspond to Segments 1..18
const eventsInRange = sub.events.slice(0, 36);

const offText = eventsInRange
  .map((e: any) => (e.segs || []).map((s: any) => s.utf8).join(""))
  .join(" ")
  .replace(/\n/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const offWords = cleanWords(offText);
const lessonWords: string[] = [];
LESSON_TED_BILINGUAL_BRAIN.segments.forEach((s) => lessonWords.push(...cleanWords(s.text)));

console.log("Official events count (Events 0..35):", eventsInRange.length);
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
