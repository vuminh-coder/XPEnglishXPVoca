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

const rawLines = sub.events
  .slice(0, 24)
  .map((e: any) => ({
    start: (e.tStartMs || 0) / 1000,
    end: ((e.tStartMs || 0) + (e.dDurationMs || 0)) / 1000,
    text: (e.segs || []).map((s: any) => s.utf8).join("").replace(/\n/g, " ").replace(/\s+/g, " ").trim(),
  }));

console.log("Raw events count:", rawLines.length);

LESSON_BBC_SUNKEN_SHIP.segments.forEach((seg, idx) => {
  console.log(`\nSeg ${seg.orderIndex} [${seg.startTime}s - ${seg.endTime}s]: "${seg.text}"`);
});
