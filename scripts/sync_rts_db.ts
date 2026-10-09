import { PrismaClient } from "@prisma/client";
import { LESSON_REWRITE_THE_STARS } from "../features/listening/data/lessons/lesson_rewrite_the_stars";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing calibrated 100% verbatim Rewrite The Stars to Neon DB...");

  // 1. Update VideoLesson
  const videoLesson = await prisma.videoLesson.upsert({
    where: { id: LESSON_REWRITE_THE_STARS.id },
    update: {
      title: LESSON_REWRITE_THE_STARS.title,
      description: LESSON_REWRITE_THE_STARS.description,
      sourceType: LESSON_REWRITE_THE_STARS.sourceType,
      externalId: LESSON_REWRITE_THE_STARS.externalId,
      thumbnailUrl: LESSON_REWRITE_THE_STARS.thumbnailUrl,
      durationSeconds: LESSON_REWRITE_THE_STARS.durationSeconds,
      durationFormatted: LESSON_REWRITE_THE_STARS.durationFormatted,
      cefrLevel: LESSON_REWRITE_THE_STARS.cefrLevel,
      supportedTypes: LESSON_REWRITE_THE_STARS.supportedTypes,
      categoryId: LESSON_REWRITE_THE_STARS.categoryId,
      accent: LESSON_REWRITE_THE_STARS.accent,
      wpmSpeed: LESSON_REWRITE_THE_STARS.wpmSpeed,
      viewCount: LESSON_REWRITE_THE_STARS.viewCount,
      studyCount: LESSON_REWRITE_THE_STARS.studyCount,
    },
    create: {
      id: LESSON_REWRITE_THE_STARS.id,
      slug: LESSON_REWRITE_THE_STARS.slug,
      title: LESSON_REWRITE_THE_STARS.title,
      description: LESSON_REWRITE_THE_STARS.description,
      sourceType: LESSON_REWRITE_THE_STARS.sourceType,
      externalId: LESSON_REWRITE_THE_STARS.externalId,
      thumbnailUrl: LESSON_REWRITE_THE_STARS.thumbnailUrl,
      durationSeconds: LESSON_REWRITE_THE_STARS.durationSeconds,
      durationFormatted: LESSON_REWRITE_THE_STARS.durationFormatted,
      cefrLevel: LESSON_REWRITE_THE_STARS.cefrLevel,
      supportedTypes: LESSON_REWRITE_THE_STARS.supportedTypes,
      categoryId: LESSON_REWRITE_THE_STARS.categoryId,
      accent: LESSON_REWRITE_THE_STARS.accent,
      wpmSpeed: LESSON_REWRITE_THE_STARS.wpmSpeed,
      viewCount: LESSON_REWRITE_THE_STARS.viewCount,
      studyCount: LESSON_REWRITE_THE_STARS.studyCount,
    }
  });

  console.log(`VideoLesson upserted: ${videoLesson.id}`);

  // 2. Clear and recreate LessonSegment rows
  await prisma.lessonSegment.deleteMany({
    where: { lessonId: videoLesson.id }
  });

  for (const seg of LESSON_REWRITE_THE_STARS.segments) {
    const normalizedText = seg.text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .join(" ");

    await prisma.lessonSegment.create({
      data: {
        lessonId: videoLesson.id,
        orderIndex: seg.orderIndex,
        startTime: seg.startTime,
        endTime: seg.endTime,
        text: seg.text,
        normalizedText,
        ipaUs: seg.ipaUs,
        translationVi: seg.translationVi,
        explanationAi: seg.explanationAi,
        properNouns: seg.properNouns || [],
        keywords: seg.keywords || [],
        tokenCount: seg.tokenCount,
      }
    });
  }

  console.log(`Inserted ${LESSON_REWRITE_THE_STARS.segments.length} calibrated segments for ${videoLesson.id}`);

  // 3. Upsert ListeningLesson
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

  console.log("ListeningLesson synced successfully!");
  console.log("🎉 Database 100% calibration complete!");
}

main()
  .catch((e) => {
    console.error("DB Sync error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
