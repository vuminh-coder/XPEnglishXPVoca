import { LESSON_BBC_SUNKEN_SHIP } from "../features/listening/data/lessons/lesson_bbc_sunken_ship";
import { tokenizeSentence } from "../features/listening/components/DictationWorkspace";

let totalTokens = 0;
LESSON_BBC_SUNKEN_SHIP.segments.forEach((seg) => {
  const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
  console.log(`Seg ${seg.orderIndex} has ${tokens.length} tokens:`, tokens.map(t => t.clean).join(" "));
  totalTokens += tokens.length;
});
console.log("Total tokens from tokenizeSentence:", totalTokens);
