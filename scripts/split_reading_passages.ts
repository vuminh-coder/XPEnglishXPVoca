import fs from "fs";
import path from "path";
import { READING_PASSAGES_DATA } from "../features/reading/data/readingMockData";

const outDir = path.resolve(__dirname, "../features/reading/data/passages");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Write existing passages r1 to r32
READING_PASSAGES_DATA.forEach((passage) => {
  const fileContent = `import { ReadingPassage } from "./types";

export const passage_${passage.id}: ReadingPassage = ${JSON.stringify(passage, null, 2)};
`;

  const filePath = path.join(outDir, `passage_${passage.id}.ts`);
  fs.writeFileSync(filePath, fileContent, "utf8");
  console.log(`Generated passage_${passage.id}.ts`);
});

console.log("All 32 existing passages split into individual files successfully!");
