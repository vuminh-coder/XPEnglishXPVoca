export {};
import { PrismaClient } from "@prisma/client";
import { LESSON_RATATOUILLE_ANTON_EGO } from "../features/listening/data/lessons/lesson_ratatouille_anton_ego";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 15 (Ratatouille: Anton Ego Review) ListeningLesson to Neon DB...");

  await prisma.listeningLesson.upsert({
    where: { id: LESSON_RATATOUILLE_ANTON_EGO.id },
    update: {
      title: LESSON_RATATOUILLE_ANTON_EGO.title,
      category: "Stories & Culture",
      level: "C1",
      duration: LESSON_RATATOUILLE_ANTON_EGO.durationFormatted,
      accent: LESSON_RATATOUILLE_ANTON_EGO.accent || "en-GB",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_RATATOUILLE_ANTON_EGO.externalId}`,
      imageUrl: LESSON_RATATOUILLE_ANTON_EGO.thumbnailUrl,
      transcript: LESSON_RATATOUILLE_ANTON_EGO.segments.map((s, idx) => ({
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
      id: LESSON_RATATOUILLE_ANTON_EGO.id,
      title: LESSON_RATATOUILLE_ANTON_EGO.title,
      category: "Stories & Culture",
      level: "C1",
      duration: LESSON_RATATOUILLE_ANTON_EGO.durationFormatted,
      accent: LESSON_RATATOUILLE_ANTON_EGO.accent || "en-GB",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_RATATOUILLE_ANTON_EGO.externalId}`,
      imageUrl: LESSON_RATATOUILLE_ANTON_EGO.thumbnailUrl,
      transcript: LESSON_RATATOUILLE_ANTON_EGO.segments.map((s, idx) => ({
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

  console.log("✅ Successfully synced ListeningLesson for Lesson 15 (Ratatouille Anton Ego)!");
}

main()
  .catch((e) => {
    console.error("DB Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
