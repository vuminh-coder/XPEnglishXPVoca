export {};
import fs from "fs";

const audio = JSON.parse(fs.readFileSync("scripts/natgeo_audio.json", "utf8"));
console.log("Whisper segments count:", audio.segments?.length);
const lastSeg = audio.segments[audio.segments.length - 1];
console.log("Last segment text:", lastSeg?.text);
const words: string[] = [];
audio.segments.forEach((s: any) => {
  if (s.words) {
    s.words.forEach((w: any) => words.push(w.word.trim()));
  }
});
console.log("Whisper total words:", words.length);
console.log("Whisper last words:", words.slice(-25).join(" "));
