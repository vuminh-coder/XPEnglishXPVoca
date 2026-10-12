import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";
import fs from "fs";
import path from "path";

const jsonPath = path.resolve("scripts/all_pure_pride_segments.json");
const rawData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

console.log(`Processing ${rawData.length} pure segments...`);

const updated = rawData.map((seg: any, idx: number) => {
  const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
  return {
    ...seg,
    orderIndex: idx,
    tokenCount: tokens.length,
  };
});

fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2), "utf-8");
console.log(`Saved updated 81 pure segments with exact tokenCounts to ${jsonPath}`);
