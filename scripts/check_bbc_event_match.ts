import fs from "fs";
import { LESSON_BBC_SUNKEN_SHIP } from "../features/listening/data/lessons/lesson_bbc_sunken_ship";

const sub = JSON.parse(fs.readFileSync("scripts/bbc_brain_official.en-GB.json3", "utf8"));

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

// Check events 0 to 23:
console.log("=== CHECKING EVENTS 0 TO 23 AGAINST 13 SEGMENTS ===");
const eventsText = sub.events
  .slice(0, 24)
  .map((e: any) => (e.segs || []).map((s: any) => s.utf8).join(""))
  .join(" ")
  .replace(/\n/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const offWords = cleanWords(eventsText);
const lessonWords: string[] = [];
LESSON_BBC_SUNKEN_SHIP.segments.forEach((s) => lessonWords.push(...cleanWords(s.text)));

console.log("Official words count (Events 0..23):", offWords.length);
console.log("Lesson words count (Segments 1..13):", lessonWords.length);

let diffs = 0;
for (let i = 0; i < Math.max(offWords.length, lessonWords.length); i++) {
  if (offWords[i] !== lessonWords[i]) {
    diffs++;
    console.log(`Diff at ${i}: Official="${offWords[i]}" vs Lesson="${lessonWords[i]}"`);
  }
}
console.log(`Total diffs: ${diffs}`);
