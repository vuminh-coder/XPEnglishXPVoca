export {};
import { PrismaClient } from "@prisma/client";
import { LESSON_CAREERVIDZ_INTERVIEW } from "../features/listening/data/lessons/lesson_careervidz_interview";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 14 (CareerVidz: Tell Me About Yourself) ListeningLesson to Neon DB...");

  await prisma.listeningLesson.upsert({
    where: { id: LESSON_CAREERVIDZ_INTERVIEW.id },
    update: {
      title: LESSON_CAREERVIDZ_INTERVIEW.title,
      category: "Career & Business",
      level: "B1",
      duration: LESSON_CAREERVIDZ_INTERVIEW.durationFormatted,
      accent: LESSON_CAREERVIDZ_INTERVIEW.accent || "en-GB",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_CAREERVIDZ_INTERVIEW.externalId}`,
      imageUrl: LESSON_CAREERVIDZ_INTERVIEW.thumbnailUrl,
      transcript: LESSON_CAREERVIDZ_INTERVIEW.segments.map((s, idx) => ({
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
      id: LESSON_CAREERVIDZ_INTERVIEW.id,
      title: LESSON_CAREERVIDZ_INTERVIEW.title,
      category: "Career & Business",
      level: "B1",
      duration: LESSON_CAREERVIDZ_INTERVIEW.durationFormatted,
      accent: LESSON_CAREERVIDZ_INTERVIEW.accent || "en-GB",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_CAREERVIDZ_INTERVIEW.externalId}`,
      imageUrl: LESSON_CAREERVIDZ_INTERVIEW.thumbnailUrl,
      transcript: LESSON_CAREERVIDZ_INTERVIEW.segments.map((s, idx) => ({
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

  console.log("✅ Successfully synced ListeningLesson for Lesson 14 (CareerVidz)!");
}

main()
  .catch((e) => {
    console.error("DB Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
