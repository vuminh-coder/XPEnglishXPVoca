import fs from "fs";
import { LESSON_KURZGESAGT_INTERSTELLAR } from "../features/listening/data/lessons/lesson_kurzgesagt_interstellar";

const sub = JSON.parse(fs.readFileSync("scripts/kurzgesagt_raw.en.json3", "utf8"));
const lines = sub.events
  .filter((e: any) => e.segs)
  .map((e: any) => ({
    start: e.tStartMs / 1000,
    duration: (e.dDurationMs || 0) / 1000,
    end: (e.tStartMs + (e.dDurationMs || 0)) / 1000,
    text: e.segs.map((s: any) => s.utf8).join("").replace(/\n/g, " ").replace(/\s+/g, " ").trim(),
  }))
  .filter((l: any) => l.text);

const segMap = [
  [0], [1, 2], [3, 4], [5, 6], [7], [8], [9, 10], [11], [12], [13],
  [14, 15], [16, 17], [18, 19], [20, 21, 22], [23], [24], [25], [26],
  [27, 28], [29], [30, 31, 32]
];

console.log("--- Timestamp & Text Precision Comparison ---");
let maxDiff = 0;
let textDiffs = 0;

LESSON_KURZGESAGT_INTERSTELLAR.segments.forEach((seg, idx) => {
  const indices = segMap[idx];
  const rawStart = lines[indices[0]].start;
  const rawEnd = lines[indices[indices.length - 1]].end;
  const diffStart = Math.abs(seg.startTime - rawStart);
  const diffEnd = Math.abs(seg.endTime - rawEnd);

  const rawCombinedText = indices.map((i: number) => lines[i].text).join(" ");
  const cleanLesson = seg.text.toLowerCase().replace(/[^a-z0-9]/g, "");
  const cleanRaw = rawCombinedText.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (cleanLesson !== cleanRaw) {
    console.log(`❌ TEXT MISMATCH at Seg #${idx + 1}:`);
    console.log(`  Lesson: "${seg.text}"`);
    console.log(`  Raw   : "${rawCombinedText}"`);
    textDiffs++;
  }

  if (diffStart > 0.05 || diffEnd > 0.05) {
    console.log(`⚠️ TIMING DELTA at Seg #${idx + 1}: Lesson=[${seg.startTime} -> ${seg.endTime}] vs Raw=[${rawStart.toFixed(2)} -> ${rawEnd.toFixed(2)}] (diffStart: ${diffStart.toFixed(3)}s, diffEnd: ${diffEnd.toFixed(3)}s)`);
  }

  if (diffStart > maxDiff) maxDiff = diffStart;
  if (diffEnd > maxDiff) maxDiff = diffEnd;
});

console.log(`\nText Differences: ${textDiffs}`);
console.log(`Max Timestamp Delta: ${maxDiff.toFixed(3)}s`);
