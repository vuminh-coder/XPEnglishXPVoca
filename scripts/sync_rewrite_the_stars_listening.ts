import { PrismaClient } from "@prisma/client";
import { LESSON_REWRITE_THE_STARS } from "../features/listening/data/lessons/lesson_rewrite_the_stars";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 1 ListeningLesson to Neon DB...");

  await prisma.listeningLesson.upsert({
    where: { id: LESSON_REWRITE_THE_STARS.id },
    update: {
      title: LESSON_REWRITE_THE_STARS.title,
      category: "Music",
      level: "Intermediate",
      duration: LESSON_REWRITE_THE_STARS.durationFormatted,
      accent: LESSON_REWRITE_THE_STARS.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_REWRITE_THE_STARS.externalId}`,
      imageUrl: LESSON_REWRITE_THE_STARS.thumbnailUrl,
      transcript: LESSON_REWRITE_THE_STARS.segments.map((s, idx) => ({
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
      id: LESSON_REWRITE_THE_STARS.id,
      title: LESSON_REWRITE_THE_STARS.title,
      category: "Music",
      level: "Intermediate",
      duration: LESSON_REWRITE_THE_STARS.durationFormatted,
      accent: LESSON_REWRITE_THE_STARS.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_REWRITE_THE_STARS.externalId}`,
      imageUrl: LESSON_REWRITE_THE_STARS.thumbnailUrl,
      transcript: LESSON_REWRITE_THE_STARS.segments.map((s, idx) => ({
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
    }
  });

  console.log("✅ Successfully synced ListeningLesson for Lesson 1!");
}

main()
  .catch((e) => {
    console.error("DB Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
