import fs from "fs";

const sub = JSON.parse(fs.readFileSync("scripts/ted_bilingual_raw.en.json3", "utf8"));

sub.events.forEach((e: any, idx: number) => {
  const t = (e.tStartMs || 0) / 1000;
  const d = (e.dDurationMs || 0) / 1000;
  const text = (e.segs || []).map((s: any) => s.utf8).join("").replace(/\n/g, " ");
  if (t >= 115 && t <= 135) {
    console.log(`[Event ${idx}] [${t.toFixed(2)}s - ${(t + d).toFixed(2)}s]: "${text}"`);
  }
});
