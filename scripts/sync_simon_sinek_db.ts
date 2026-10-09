import { PrismaClient } from "@prisma/client";
import { LESSON_SIMON_SINEK } from "../features/listening/data/lessons/lesson_simon_sinek";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 17 (Simon Sinek: Golden Circle) into Neon Database...");

  // 1. Find category by slug or id
  const category = await prisma.videoCategory.findFirst({
    where: {
      OR: [
        { id: LESSON_SIMON_SINEK.categoryId },
        { slug: LESSON_SIMON_SINEK.categorySlug }
      ]
    }
  });

  const categoryId = category ? category.id : LESSON_SIMON_SINEK.categoryId;
  console.log(`Using Category ID: ${categoryId}`);

  // 2. Upsert VideoLesson
  const videoLesson = await prisma.videoLesson.upsert({
    where: { slug: LESSON_SIMON_SINEK.slug },
    update: {
      id: LESSON_SIMON_SINEK.id,
      title: LESSON_SIMON_SINEK.title,
      description: LESSON_SIMON_SINEK.description,
      sourceType: LESSON_SIMON_SINEK.sourceType,
      externalId: LESSON_SIMON_SINEK.externalId,
      thumbnailUrl: LESSON_SIMON_SINEK.thumbnailUrl,
      durationSeconds: LESSON_SIMON_SINEK.durationSeconds,
      durationFormatted: LESSON_SIMON_SINEK.durationFormatted,
      cefrLevel: LESSON_SIMON_SINEK.cefrLevel,
      supportedTypes: LESSON_SIMON_SINEK.supportedTypes,
      categoryId,
      accent: LESSON_SIMON_SINEK.accent,
      wpmSpeed: LESSON_SIMON_SINEK.wpmSpeed,
      viewCount: LESSON_SIMON_SINEK.viewCount,
      studyCount: LESSON_SIMON_SINEK.studyCount,
    },
    create: {
      id: LESSON_SIMON_SINEK.id,
      slug: LESSON_SIMON_SINEK.slug,
      title: LESSON_SIMON_SINEK.title,
      description: LESSON_SIMON_SINEK.description,
      sourceType: LESSON_SIMON_SINEK.sourceType,
      externalId: LESSON_SIMON_SINEK.externalId,
      thumbnailUrl: LESSON_SIMON_SINEK.thumbnailUrl,
      durationSeconds: LESSON_SIMON_SINEK.durationSeconds,
      durationFormatted: LESSON_SIMON_SINEK.durationFormatted,
      cefrLevel: LESSON_SIMON_SINEK.cefrLevel,
      supportedTypes: LESSON_SIMON_SINEK.supportedTypes,
      categoryId,
      accent: LESSON_SIMON_SINEK.accent,
      wpmSpeed: LESSON_SIMON_SINEK.wpmSpeed,
      viewCount: LESSON_SIMON_SINEK.viewCount,
      studyCount: LESSON_SIMON_SINEK.studyCount,
    }
  });

  console.log(`VideoLesson upserted: ${videoLesson.id} (${videoLesson.title})`);

  // 3. Clear existing segments and insert calibrated segments
  await prisma.lessonSegment.deleteMany({
    where: { lessonId: videoLesson.id }
  });

  for (const seg of LESSON_SIMON_SINEK.segments) {
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
        tokenCount: seg.tokenCount || seg.text.split(/\s+/).filter(Boolean).length,
      }
    });
  }

  console.log(`Inserted ${LESSON_SIMON_SINEK.segments.length} calibrated segments for ${videoLesson.id}`);

  // 4. Upsert ListeningLesson table for parity
  await prisma.listeningLesson.upsert({
    where: { id: LESSON_SIMON_SINEK.id },
    update: {
      title: LESSON_SIMON_SINEK.title,
      category: "IELTS",
      level: "Advanced",
      duration: LESSON_SIMON_SINEK.durationFormatted,
      accent: LESSON_SIMON_SINEK.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_SIMON_SINEK.externalId}`,
      imageUrl: LESSON_SIMON_SINEK.thumbnailUrl,
      transcript: LESSON_SIMON_SINEK.segments.map((s, idx) => ({
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
      id: LESSON_SIMON_SINEK.id,
      title: LESSON_SIMON_SINEK.title,
      category: "IELTS",
      level: "Advanced",
      duration: LESSON_SIMON_SINEK.durationFormatted,
      accent: LESSON_SIMON_SINEK.accent || "en-US",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_SIMON_SINEK.externalId}`,
      imageUrl: LESSON_SIMON_SINEK.thumbnailUrl,
      transcript: LESSON_SIMON_SINEK.segments.map((s, idx) => ({
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

  console.log(`Synced ListeningLesson: ${LESSON_SIMON_SINEK.id}`);
  console.log("🎉 Database synchronization completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during DB sync:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
