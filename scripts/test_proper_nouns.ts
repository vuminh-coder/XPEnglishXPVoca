import { tokenizeSentence, extractProperNouns } from "../features/listening/components/DictationWorkspace";
import { LESSON_RATATOUILLE_ANTON_EGO } from "../features/listening/data/lessons/lesson_ratatouille_anton_ego";

LESSON_RATATOUILLE_ANTON_EGO.segments.forEach((seg, idx) => {
  const extracted = extractProperNouns(seg.text);
  const explicit = seg.properNouns || [];
  const combined = Array.from(new Set([...explicit, ...extracted]));
  const tokens = tokenizeSentence(seg.text, combined);

  const properTokens = tokens.filter(t => t.isProperNoun);
  console.log(`\nSeg #${idx}: "${seg.text}"`);
  console.log(`  Explicit proper nouns:`, explicit);
  console.log(`  Auto-extracted proper nouns:`, extracted);
  console.log(`  Recognized proper tokens:`, properTokens.map(t => `${t.clean} (isProper=${t.isProperNoun})`));
});
