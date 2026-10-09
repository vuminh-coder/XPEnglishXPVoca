import fs from "fs";
import { LESSON_STEVE_JOBS } from "../features/listening/data/lessons/lesson_steve_jobs";

const sub = JSON.parse(fs.readFileSync("scripts/steve_jobs_official.en-eEY6OEpapPo.json3", "utf8"));

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

// Find the events corresponding to Segments 1..18 (up to 172.92s)
const matchedEvents = sub.events.filter((e: any) => {
  const t = (e.tStartMs || 0) / 1000;
  return t >= 22.0 && t < 173.0 && e.segs;
});

const offText = matchedEvents
  .map((e: any) => (e.segs || []).map((s: any) => s.utf8).join(""))
  .join(" ")
  .replace(/\n/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const offWords = cleanWords(offText);
const lessonWords: string[] = [];
LESSON_STEVE_JOBS.segments.forEach((s) => lessonWords.push(...cleanWords(s.text)));

console.log("Official words (t < 173s):", offWords.length);
console.log("Lesson words (18 segs):", lessonWords.length);

let diffs = 0;
for (let i = 0; i < Math.max(offWords.length, lessonWords.length); i++) {
  if (offWords[i] !== lessonWords[i]) {
    diffs++;
    console.log(`Diff at ${i}: Official="${offWords[i]}" vs Lesson="${lessonWords[i]}"`);
  }
}
console.log(`Total diffs: ${diffs}`);
