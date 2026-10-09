import { PrismaClient } from "@prisma/client";
import { LESSON_DAILY_PETS } from "../features/listening/data/lessons/lesson_daily_pets";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 3 (Daily Pets) ListeningLesson to Neon DB...");

  await prisma.listeningLesson.upsert({
    where: { id: LESSON_DAILY_PETS.id },
    update: {
      title: LESSON_DAILY_PETS.title,
      category: "Daily Life",
      level: "Intermediate",
      duration: LESSON_DAILY_PETS.durationFormatted,
      accent: LESSON_DAILY_PETS.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_DAILY_PETS.externalId}`,
      imageUrl: LESSON_DAILY_PETS.thumbnailUrl,
      transcript: LESSON_DAILY_PETS.segments.map((s, idx) => ({
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
      id: LESSON_DAILY_PETS.id,
      title: LESSON_DAILY_PETS.title,
      category: "Daily Life",
      level: "Intermediate",
      duration: LESSON_DAILY_PETS.durationFormatted,
      accent: LESSON_DAILY_PETS.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_DAILY_PETS.externalId}`,
      imageUrl: LESSON_DAILY_PETS.thumbnailUrl,
      transcript: LESSON_DAILY_PETS.segments.map((s, idx) => ({
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

  console.log("✅ Successfully synced ListeningLesson for Lesson 3 (Daily Pets)!");
}

main()
  .catch((e) => {
    console.error("DB Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
