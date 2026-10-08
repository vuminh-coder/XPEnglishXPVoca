import fs from "fs";
import { LESSON_OXFORD_FOOD_COOKING } from "../features/listening/data/lessons/lesson_oxford_food_cooking";
import { LESSON_DAVID_ATTENBOROUGH_PLANET } from "../features/listening/data/lessons/lesson_david_attenborough_planet";
import { LESSON_CAREERVIDZ_INTERVIEW } from "../features/listening/data/lessons/lesson_careervidz_interview";
import { LESSON_RATATOUILLE_ANTON_EGO } from "../features/listening/data/lessons/lesson_ratatouille_anton_ego";
import { LESSON_PSYCHOLOGY_OF_MONEY } from "../features/listening/data/lessons/lesson_psychology_of_money";

const normalize = (w: string) => {
  return w
    .replace(/[.,!?:;\"\'\(\)\-’‘“”…]/g, "")
    .replace(/^howell$/i, "housel")
    .replace(/^howel$/i, "housel")
    .toLowerCase();
};

function auditLesson(name: string, rawPath: string, lesson: any, startMsLimit: number, endMsLimit: number) {
  console.log(`\n======================================================`);
  console.log(`AUDITING: ${name} (${lesson.externalId})`);
  console.log(`======================================================`);
  
  const raw = JSON.parse(fs.readFileSync(rawPath, "utf8"));
  const rawWords: { word: string; startMs: number }[] = [];

  raw.events.forEach((e: any) => {
    if (!e.segs) return;
    const baseT = e.tStartMs;
    if (baseT < startMsLimit || baseT > endMsLimit) return;
    e.segs.forEach((s: any) => {
      const text = s.utf8;
      if (!text || text === "\n") return;
      const offset = s.tOffsetMs || 0;
      const startMs = baseT + offset;
      const trimmed = text.trim();
      if (trimmed && !trimmed.startsWith("(") && !trimmed.startsWith("[")) {
        const parts = trimmed.split(/\s+/);
        parts.forEach((p: string) => {
          if (p && p !== "–") rawWords.push({ word: p, startMs });
        });
      }
    });
  });

  const calWords: { word: string; segIdx: number }[] = [];
  lesson.segments.forEach((c: any, cIdx: number) => {
    const words = c.text.trim().split(/\s+/);
    words.forEach((w: string) => {
      if (w && w !== "–") calWords.push({ word: w, segIdx: cIdx });
    });
  });

  console.log(`Raw YouTube words: ${rawWords.length}`);
  console.log(`Lesson words:      ${calWords.length}`);

  let diffCount = 0;
  const len = Math.max(rawWords.length, calWords.length);
  for (let i = 0; i < len; i++) {
    const rw = rawWords[i] ? normalize(rawWords[i].word) : "<EOF>";
    const cw = calWords[i] ? normalize(calWords[i].word) : "<EOF>";
    if (rw !== cw) {
      console.log(`  Mismatch [${i}]: raw="${rawWords[i]?.word}" vs lesson="${calWords[i]?.word}" (Seg #${(calWords[i]?.segIdx ?? 0) + 1})`);
      diffCount++;
      if (diffCount > 10) break;
    }
  }

  if (diffCount === 0 && rawWords.length === calWords.length) {
    console.log(`🏆 100% PERFECT WORD-FOR-WORD VERBATIM MATCH! (0 differences)`);
  } else {
    console.log(`⚠️ Differences found: ${diffCount}`);
  }
}

// 1. Oxford Food (52.85s to 121s)
auditLesson("Oxford Food & Cooking", "scripts/oxford_food.en.json3", LESSON_OXFORD_FOOD_COOKING, 52000, 122000);

// 2. David Attenborough (0.21s to 99s)
auditLesson("David Attenborough Planet", "scripts/attenborough.en-US.json3", LESSON_DAVID_ATTENBOROUGH_PLANET, 0, 100000);

// 3. CareerVidz (0s to 84s)
auditLesson("CareerVidz Interview", "scripts/careervidz.en.json3", LESSON_CAREERVIDZ_INTERVIEW, 0, 84000);

// 4. Ratatouille (2.76s to 119s)
auditLesson("Ratatouille Anton Ego", "scripts/ratatouille_ego.en.json3", LESSON_RATATOUILLE_ANTON_EGO, 2000, 120000);

// 5. Psychology of Money (0s to 49s)
auditLesson("The Psychology of Money", "scripts/money.en.json3", LESSON_PSYCHOLOGY_OF_MONEY, 0, 49000);
