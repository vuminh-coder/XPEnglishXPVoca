import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";
import { LESSON_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN } from "../features/listening/data/lessons/movies/romance/lesson_pride_and_prejudice";
import fs from "fs";
import path from "path";

const lesson = LESSON_PRIDE_AND_PREJUDICE_RAIN_PROPOSAL_DAWN;

console.log(`Checking ${lesson.segments.length} segments...`);
let mismatches = 0;
const updatedSegments = lesson.segments.map((seg) => {
  const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
  if (seg.tokenCount !== tokens.length) {
    console.log(`Mismatch at seg ${seg.orderIndex}: current=${seg.tokenCount}, actual=${tokens.length}`);
    console.log(`Text: "${seg.text}"`);
    mismatches++;
  }
  return {
    ...seg,
    tokenCount: tokens.length,
  };
});

console.log(`Total mismatches: ${mismatches}`);

// Update JSON and regenerate TS file
const jsonPath = path.resolve("scripts/all_51_pride_and_prejudice_segments.json");
fs.writeFileSync(jsonPath, JSON.stringify(updatedSegments, null, 2), "utf-8");
console.log(`Updated ${jsonPath}`);
