import { PrismaClient } from "@prisma/client";
import { LESSON_TED_BILINGUAL_BRAIN } from "../features/listening/data/lessons/lesson_ted_bilingual_brain";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 6 (TED-Ed Bilingual Brain) ListeningLesson to Neon DB...");

  await prisma.listeningLesson.upsert({
    where: { id: LESSON_TED_BILINGUAL_BRAIN.id },
    update: {
      title: LESSON_TED_BILINGUAL_BRAIN.title,
      category: "Science",
      level: "Intermediate",
      duration: LESSON_TED_BILINGUAL_BRAIN.durationFormatted,
      accent: LESSON_TED_BILINGUAL_BRAIN.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_TED_BILINGUAL_BRAIN.externalId}`,
      imageUrl: LESSON_TED_BILINGUAL_BRAIN.thumbnailUrl,
      transcript: LESSON_TED_BILINGUAL_BRAIN.segments.map((s, idx) => ({
        id: `seg_${idx + 1}`,
        startTime: s.startTime,
        endTime: s.endTime,
        text: s.text,
        translation: s.translationVi,
        translationVi: s.translationVi,
        ipa: s.ipaUs,
        explanationVi: "",
        properNouns: s.properNouns || [],
        keywords: s.keywords || [],
      })),
    },
    create: {
      id: LESSON_TED_BILINGUAL_BRAIN.id,
      title: LESSON_TED_BILINGUAL_BRAIN.title,
      category: "Science",
      level: "Intermediate",
      duration: LESSON_TED_BILINGUAL_BRAIN.durationFormatted,
      accent: LESSON_TED_BILINGUAL_BRAIN.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_TED_BILINGUAL_BRAIN.externalId}`,
      imageUrl: LESSON_TED_BILINGUAL_BRAIN.thumbnailUrl,
      transcript: LESSON_TED_BILINGUAL_BRAIN.segments.map((s, idx) => ({
        id: `seg_${idx + 1}`,
        startTime: s.startTime,
        endTime: s.endTime,
        text: s.text,
        translation: s.translationVi,
        translationVi: s.translationVi,
        ipa: s.ipaUs,
        explanationVi: "",
        properNouns: s.properNouns || [],
        keywords: s.keywords || [],
      })),
    },
  });

  console.log("✅ Successfully synced ListeningLesson for Lesson 6 (TED-Ed Bilingual Brain)!");
}

main()
  .catch((e) => {
    console.error("DB Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
