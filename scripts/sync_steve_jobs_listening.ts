import { PrismaClient } from "@prisma/client";
import { LESSON_STEVE_JOBS } from "../features/listening/data/lessons/lesson_steve_jobs";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 5 (Steve Jobs) ListeningLesson to Neon DB...");

  await prisma.listeningLesson.upsert({
    where: { id: LESSON_STEVE_JOBS.id },
    update: {
      title: LESSON_STEVE_JOBS.title,
      category: "Speech",
      level: "Upper-Intermediate",
      duration: LESSON_STEVE_JOBS.durationFormatted,
      accent: LESSON_STEVE_JOBS.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_STEVE_JOBS.externalId}`,
      imageUrl: LESSON_STEVE_JOBS.thumbnailUrl,
      transcript: LESSON_STEVE_JOBS.segments.map((s, idx) => ({
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
      id: LESSON_STEVE_JOBS.id,
      title: LESSON_STEVE_JOBS.title,
      category: "Speech",
      level: "Upper-Intermediate",
      duration: LESSON_STEVE_JOBS.durationFormatted,
      accent: LESSON_STEVE_JOBS.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_STEVE_JOBS.externalId}`,
      imageUrl: LESSON_STEVE_JOBS.thumbnailUrl,
      transcript: LESSON_STEVE_JOBS.segments.map((s, idx) => ({
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

  console.log("✅ Successfully synced ListeningLesson for Lesson 5 (Steve Jobs)!");
}

main()
  .catch((e) => {
    console.error("DB Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
