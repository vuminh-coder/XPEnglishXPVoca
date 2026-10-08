import { tokenizeSentence, extractProperNouns } from "../features/listening/components/DictationWorkspace";
import { LESSON_PSYCHOLOGY_OF_MONEY } from "../features/listening/data/lessons/lesson_psychology_of_money";

LESSON_PSYCHOLOGY_OF_MONEY.segments.forEach((seg, idx) => {
  const pns = extractProperNouns(seg.text, seg.properNouns || []);
  const tokens = tokenizeSentence(seg.text, pns);

  const maskedDisplay = tokens
    .map((t) => `${t.leadingPunc}${t.isProperNoun ? `[${t.clean}]` : t.dots}${t.trailingPunc}`)
    .join(" ");

  console.log(`\nSeg #${idx + 1} (${tokens.length} tokens):`);
  console.log(`  Raw Text: "${seg.text}"`);
  console.log(`  Proper Nouns:`, pns);
  console.log(`  Masked Display: ${maskedDisplay}`);
});
