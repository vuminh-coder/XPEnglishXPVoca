import fs from "fs";
import { LESSON_REWRITE_THE_STARS } from "../features/listening/data/lessons/lesson_rewrite_the_stars";

const txt = fs.readFileSync("scripts/rts_info.json", "utf16le").replace(/^\uFEFF/, "");
const info = JSON.parse(txt);
const lines: string[] = info.description.split("\n");
const startIdx = lines.findIndex((l) => l.trim() === "Lyrics:");
const lyricsLines: string[] = [];

for (let i = startIdx + 1; i < lines.length; i++) {
  const l = lines[i].trim();
  if (l.startsWith("No one can rewrite the stars")) break;
  if (l) lyricsLines.push(l);
}

const rawOfficialText = lyricsLines.join(" ");

function cleanWords(s: string): string[] {
  return s
    .replace(/\(.*?\)/g, "") // remove parenthetical backing vocals like (There are mountains)
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

const officialWords = cleanWords(rawOfficialText);

// Calibrated 18 segments test
const calibratedTexts = [
  "You know I want you, it's not a secret I try to hide.",
  "You know you want me, so don't keep saying our hands are tied.",
  "You claim it's not in the cards,",
  "And fate is pulling you miles away and out of reach from me.",
  "But you're here in my heart,",
  "So who can stop me if I decide that you're my destiny?",
  "What if we rewrite the stars?",
  "Say you were made to be mine?",
  "Nothing could keep us apart,",
  "You'd be the one I was meant to find.",
  "It's up to you, and it's up to me,",
  "No one can say what we get to be.",
  "So why don't we rewrite the stars?",
  "Maybe the world could be ours tonight.",
  "You think it's easy, you think I don't want to run to you, yeah.",
  "But there are mountains, and there are doors that we can't walk through.",
  "I know you're wondering why, because we're able to be just you and me within these walls.",
  "But when we go outside, you're gonna wake up and see that it was hopeless after all."
];

const testWords: string[] = [];
calibratedTexts.forEach((s) => testWords.push(...cleanWords(s)));

console.log("Official lyrics words count:", officialWords.length);
console.log("Test words count           :", testWords.length);

let diffs = 0;
for (let i = 0; i < Math.max(officialWords.length, testWords.length); i++) {
  const ow = officialWords[i] || "<missing>";
  const tw = testWords[i] || "<missing>";
  if (ow !== tw) {
    console.log(`Diff at index ${i}: Official="${ow}" vs Test="${tw}"`);
    diffs++;
  }
}

if (diffs === 0) {
  console.log(`🎉 PERFECT 100% VERBATIM MATCH! 0 diffs across all ${officialWords.length} words!`);
} else {
  console.log(`Found ${diffs} differences.`);
}

