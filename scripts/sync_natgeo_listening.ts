import { PrismaClient } from "@prisma/client";
import { LESSON_NATGEO_RENEWABLE_ENERGY } from "../features/listening/data/lessons/lesson_natgeo_renewable_energy";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 9 (NatGeo Renewable Energy 101) ListeningLesson to Neon DB...");

  await prisma.listeningLesson.upsert({
    where: { id: LESSON_NATGEO_RENEWABLE_ENERGY.id },
    update: {
      title: LESSON_NATGEO_RENEWABLE_ENERGY.title,
      category: "Environment",
      level: "Upper-Intermediate",
      duration: LESSON_NATGEO_RENEWABLE_ENERGY.durationFormatted,
      accent: LESSON_NATGEO_RENEWABLE_ENERGY.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_NATGEO_RENEWABLE_ENERGY.externalId}`,
      imageUrl: LESSON_NATGEO_RENEWABLE_ENERGY.thumbnailUrl,
      transcript: LESSON_NATGEO_RENEWABLE_ENERGY.segments.map((s, idx) => ({
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
      id: LESSON_NATGEO_RENEWABLE_ENERGY.id,
      title: LESSON_NATGEO_RENEWABLE_ENERGY.title,
      category: "Environment",
      level: "Upper-Intermediate",
      duration: LESSON_NATGEO_RENEWABLE_ENERGY.durationFormatted,
      accent: LESSON_NATGEO_RENEWABLE_ENERGY.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_NATGEO_RENEWABLE_ENERGY.externalId}`,
      imageUrl: LESSON_NATGEO_RENEWABLE_ENERGY.thumbnailUrl,
      transcript: LESSON_NATGEO_RENEWABLE_ENERGY.segments.map((s, idx) => ({
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

  console.log("✅ Successfully synced ListeningLesson for Lesson 9 (NatGeo Renewable Energy 101)!");
}

main()
  .catch((e) => {
    console.error("DB Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
