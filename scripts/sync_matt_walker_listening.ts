import { PrismaClient } from "@prisma/client";
import { LESSON_MATT_WALKER_SLEEP } from "../features/listening/data/lessons/lesson_matt_walker_sleep";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 11 (Matt Walker Sleep) ListeningLesson to Neon DB...");

  await prisma.listeningLesson.upsert({
    where: { id: LESSON_MATT_WALKER_SLEEP.id },
    update: {
      title: LESSON_MATT_WALKER_SLEEP.title,
      category: "Health",
      level: "Upper-Intermediate",
      duration: LESSON_MATT_WALKER_SLEEP.durationFormatted,
      accent: LESSON_MATT_WALKER_SLEEP.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_MATT_WALKER_SLEEP.externalId}`,
      imageUrl: LESSON_MATT_WALKER_SLEEP.thumbnailUrl,
      transcript: LESSON_MATT_WALKER_SLEEP.segments.map((s, idx) => ({
        id: `seg_${idx + 1}`,
        startTime: s.startTime,
        endTime: s.endTime,
        text: s.text,
        translation: s.translationVi,
        translationVi: s.translationVi,
        ipa: s.ipaUs,
        explanationVi: s.explanationAi || "",
        properNouns: s.properNouns || [],
        keywords: s.keywords || [],
      })),
    },
    create: {
      id: LESSON_MATT_WALKER_SLEEP.id,
      title: LESSON_MATT_WALKER_SLEEP.title,
      category: "Health",
      level: "Upper-Intermediate",
      duration: LESSON_MATT_WALKER_SLEEP.durationFormatted,
      accent: LESSON_MATT_WALKER_SLEEP.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_MATT_WALKER_SLEEP.externalId}`,
      imageUrl: LESSON_MATT_WALKER_SLEEP.thumbnailUrl,
      transcript: LESSON_MATT_WALKER_SLEEP.segments.map((s, idx) => ({
        id: `seg_${idx + 1}`,
        startTime: s.startTime,
        endTime: s.endTime,
        text: s.text,
        translation: s.translationVi,
        translationVi: s.translationVi,
        ipa: s.ipaUs,
        explanationVi: s.explanationAi || "",
        properNouns: s.properNouns || [],
        keywords: s.keywords || [],
      })),
    },
  });

  console.log("✅ Successfully synced ListeningLesson for Lesson 11 (Matt Walker Sleep)!");
}

main()
  .catch((e) => {
    console.error("DB Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
