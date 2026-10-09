export {};
import { PrismaClient } from "@prisma/client";
import { LESSON_DAVID_ATTENBOROUGH_PLANET } from "../features/listening/data/lessons/lesson_david_attenborough_planet";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 13 (Sir David Attenborough: A Life on Our Planet) ListeningLesson to Neon DB...");

  await prisma.listeningLesson.upsert({
    where: { id: LESSON_DAVID_ATTENBOROUGH_PLANET.id },
    update: {
      title: LESSON_DAVID_ATTENBOROUGH_PLANET.title,
      category: "Nature & Environment",
      level: "B2",
      duration: LESSON_DAVID_ATTENBOROUGH_PLANET.durationFormatted,
      accent: LESSON_DAVID_ATTENBOROUGH_PLANET.accent || "en-GB",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_DAVID_ATTENBOROUGH_PLANET.externalId}`,
      imageUrl: LESSON_DAVID_ATTENBOROUGH_PLANET.thumbnailUrl,
      transcript: LESSON_DAVID_ATTENBOROUGH_PLANET.segments.map((s, idx) => ({
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
      id: LESSON_DAVID_ATTENBOROUGH_PLANET.id,
      title: LESSON_DAVID_ATTENBOROUGH_PLANET.title,
      category: "Nature & Environment",
      level: "B2",
      duration: LESSON_DAVID_ATTENBOROUGH_PLANET.durationFormatted,
      accent: LESSON_DAVID_ATTENBOROUGH_PLANET.accent || "en-GB",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_DAVID_ATTENBOROUGH_PLANET.externalId}`,
      imageUrl: LESSON_DAVID_ATTENBOROUGH_PLANET.thumbnailUrl,
      transcript: LESSON_DAVID_ATTENBOROUGH_PLANET.segments.map((s, idx) => ({
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

  console.log("✅ Successfully synced ListeningLesson for Lesson 13 (Sir David Attenborough)!");
}

main()
  .catch((e) => {
    console.error("DB Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
