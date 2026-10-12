import fs from "fs";
import { LESSON_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION } from "../features/listening/data/lessons/movies/romance/lesson_the_notebook";

const segments = LESSON_THE_NOTEBOOK_IT_WASNT_OVER_CONFRONTATION.segments;
console.log(`Found ${segments.length} segments in lesson_the_notebook.ts`);

fs.writeFileSync(
  "scripts/notebook_current_segments.json",
  JSON.stringify(segments, null, 2),
  "utf-8"
);
console.log("Successfully dumped segments to scripts/notebook_current_segments.json");
