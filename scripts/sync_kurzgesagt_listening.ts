import { PrismaClient } from "@prisma/client";
import { LESSON_KURZGESAGT_INTERSTELLAR } from "../features/listening/data/lessons/lesson_kurzgesagt_interstellar";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 2 (Kurzgesagt) ListeningLesson to Neon DB...");

  await prisma.listeningLesson.upsert({
    where: { id: LESSON_KURZGESAGT_INTERSTELLAR.id },
    update: {
      title: LESSON_KURZGESAGT_INTERSTELLAR.title,
      category: "Science",
      level: "Advanced",
      duration: LESSON_KURZGESAGT_INTERSTELLAR.durationFormatted,
      accent: LESSON_KURZGESAGT_INTERSTELLAR.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_KURZGESAGT_INTERSTELLAR.externalId}`,
      imageUrl: LESSON_KURZGESAGT_INTERSTELLAR.thumbnailUrl,
      transcript: LESSON_KURZGESAGT_INTERSTELLAR.segments.map((s, idx) => ({
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
      id: LESSON_KURZGESAGT_INTERSTELLAR.id,
      title: LESSON_KURZGESAGT_INTERSTELLAR.title,
      category: "Science",
      level: "Advanced",
      duration: LESSON_KURZGESAGT_INTERSTELLAR.durationFormatted,
      accent: LESSON_KURZGESAGT_INTERSTELLAR.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_KURZGESAGT_INTERSTELLAR.externalId}`,
      imageUrl: LESSON_KURZGESAGT_INTERSTELLAR.thumbnailUrl,
      transcript: LESSON_KURZGESAGT_INTERSTELLAR.segments.map((s, idx) => ({
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

  console.log("✅ Successfully synced ListeningLesson for Lesson 2 (Kurzgesagt)!");
}

main()
  .catch((e) => {
    console.error("DB Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
