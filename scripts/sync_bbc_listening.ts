import { PrismaClient } from "@prisma/client";
import { LESSON_BBC_SUNKEN_SHIP } from "../features/listening/data/lessons/lesson_bbc_sunken_ship";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 4 (BBC Sunken Ship) ListeningLesson to Neon DB...");

  await prisma.listeningLesson.upsert({
    where: { id: LESSON_BBC_SUNKEN_SHIP.id },
    update: {
      title: LESSON_BBC_SUNKEN_SHIP.title,
      category: "News",
      level: "Intermediate",
      duration: LESSON_BBC_SUNKEN_SHIP.durationFormatted,
      accent: LESSON_BBC_SUNKEN_SHIP.accent || "en-GB",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_BBC_SUNKEN_SHIP.externalId}`,
      imageUrl: LESSON_BBC_SUNKEN_SHIP.thumbnailUrl,
      transcript: LESSON_BBC_SUNKEN_SHIP.segments.map((s, idx) => ({
        id: `seg_${idx + 1}`,
        startTime: s.startTime,
        endTime: s.endTime,
        text: s.text,
        translation: s.translationVi,
        translationVi: s.translationVi,
        ipa: s.ipaUs,
        explanationVi: s.explanationAi,
        properNouns: s.properNouns || [],
        keywords: s.keywords || [],
      })),
    },
    create: {
      id: LESSON_BBC_SUNKEN_SHIP.id,
      title: LESSON_BBC_SUNKEN_SHIP.title,
      category: "News",
      level: "Intermediate",
      duration: LESSON_BBC_SUNKEN_SHIP.durationFormatted,
      accent: LESSON_BBC_SUNKEN_SHIP.accent || "en-GB",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_BBC_SUNKEN_SHIP.externalId}`,
      imageUrl: LESSON_BBC_SUNKEN_SHIP.thumbnailUrl,
      transcript: LESSON_BBC_SUNKEN_SHIP.segments.map((s, idx) => ({
        id: `seg_${idx + 1}`,
        startTime: s.startTime,
        endTime: s.endTime,
        text: s.text,
        translation: s.translationVi,
        translationVi: s.translationVi,
        ipa: s.ipaUs,
        explanationVi: s.explanationAi,
        properNouns: s.properNouns || [],
        keywords: s.keywords || [],
      })),
    },
  });

  console.log("✅ Successfully synced ListeningLesson for Lesson 4 (BBC Sunken Ship)!");
}

main()
  .catch((e) => {
    console.error("DB Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
