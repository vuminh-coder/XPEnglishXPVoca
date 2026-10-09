export {};
import { PrismaClient } from "@prisma/client";
import { LESSON_OXFORD_FOOD_COOKING } from "../features/listening/data/lessons/lesson_oxford_food_cooking";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 12 (Oxford Online English Food & Cooking) ListeningLesson to Neon DB...");

  await prisma.listeningLesson.upsert({
    where: { id: LESSON_OXFORD_FOOD_COOKING.id },
    update: {
      title: LESSON_OXFORD_FOOD_COOKING.title,
      category: "Food & Dining",
      level: "A2",
      duration: LESSON_OXFORD_FOOD_COOKING.durationFormatted,
      accent: LESSON_OXFORD_FOOD_COOKING.accent || "en-GB",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_OXFORD_FOOD_COOKING.externalId}`,
      imageUrl: LESSON_OXFORD_FOOD_COOKING.thumbnailUrl,
      transcript: LESSON_OXFORD_FOOD_COOKING.segments.map((s, idx) => ({
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
      id: LESSON_OXFORD_FOOD_COOKING.id,
      title: LESSON_OXFORD_FOOD_COOKING.title,
      category: "Food & Dining",
      level: "A2",
      duration: LESSON_OXFORD_FOOD_COOKING.durationFormatted,
      accent: LESSON_OXFORD_FOOD_COOKING.accent || "en-GB",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_OXFORD_FOOD_COOKING.externalId}`,
      imageUrl: LESSON_OXFORD_FOOD_COOKING.thumbnailUrl,
      transcript: LESSON_OXFORD_FOOD_COOKING.segments.map((s, idx) => ({
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

  console.log("✅ Successfully synced ListeningLesson for Lesson 12 (Oxford Online English Food & Cooking)!");
}

main()
  .catch((e) => {
    console.error("DB Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
