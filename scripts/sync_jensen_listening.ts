import { PrismaClient } from "@prisma/client";
import { LESSON_JENSEN_HUANG } from "../features/listening/data/lessons/lesson_jensen_huang";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 10 (Jensen Huang - xAI Supercomputer) ListeningLesson to Neon DB...");

  await prisma.listeningLesson.upsert({
    where: { id: LESSON_JENSEN_HUANG.id },
    update: {
      title: LESSON_JENSEN_HUANG.title,
      category: "Technology",
      level: "Upper-Intermediate",
      duration: LESSON_JENSEN_HUANG.durationFormatted,
      accent: LESSON_JENSEN_HUANG.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_JENSEN_HUANG.externalId}`,
      imageUrl: LESSON_JENSEN_HUANG.thumbnailUrl,
      transcript: LESSON_JENSEN_HUANG.segments.map((s, idx) => ({
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
      id: LESSON_JENSEN_HUANG.id,
      title: LESSON_JENSEN_HUANG.title,
      category: "Technology",
      level: "Upper-Intermediate",
      duration: LESSON_JENSEN_HUANG.durationFormatted,
      accent: LESSON_JENSEN_HUANG.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_JENSEN_HUANG.externalId}`,
      imageUrl: LESSON_JENSEN_HUANG.thumbnailUrl,
      transcript: LESSON_JENSEN_HUANG.segments.map((s, idx) => ({
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

  console.log("✅ Successfully synced ListeningLesson for Lesson 10 (Jensen Huang)!");
}

main()
  .catch((e) => {
    console.error("DB Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
