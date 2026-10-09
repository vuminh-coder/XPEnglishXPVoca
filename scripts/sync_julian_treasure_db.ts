import { PrismaClient } from "@prisma/client";
import { LESSON_JULIAN_TREASURE } from "../features/listening/data/lessons/lesson_julian_treasure";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 19 (Julian Treasure: How to Speak) into Neon Database...");

  // 1. Find category by slug or id
  const category = await prisma.videoCategory.findFirst({
    where: {
      OR: [
        { id: LESSON_JULIAN_TREASURE.categoryId },
        { slug: LESSON_JULIAN_TREASURE.categorySlug }
      ]
    }
  });

  const categoryId = category ? category.id : LESSON_JULIAN_TREASURE.categoryId;
  console.log(`Using Category ID: ${categoryId}`);

  // 2. Upsert VideoLesson
  const videoLesson = await prisma.videoLesson.upsert({
    where: { slug: LESSON_JULIAN_TREASURE.slug },
    update: {
      id: LESSON_JULIAN_TREASURE.id,
      title: LESSON_JULIAN_TREASURE.title,
      description: LESSON_JULIAN_TREASURE.description,
      sourceType: LESSON_JULIAN_TREASURE.sourceType,
      externalId: LESSON_JULIAN_TREASURE.externalId,
      thumbnailUrl: LESSON_JULIAN_TREASURE.thumbnailUrl,
      durationSeconds: LESSON_JULIAN_TREASURE.durationSeconds,
      durationFormatted: LESSON_JULIAN_TREASURE.durationFormatted,
      cefrLevel: LESSON_JULIAN_TREASURE.cefrLevel,
      supportedTypes: LESSON_JULIAN_TREASURE.supportedTypes,
      categoryId,
      accent: LESSON_JULIAN_TREASURE.accent,
      wpmSpeed: LESSON_JULIAN_TREASURE.wpmSpeed,
      viewCount: LESSON_JULIAN_TREASURE.viewCount,
      studyCount: LESSON_JULIAN_TREASURE.studyCount,
    },
    create: {
      id: LESSON_JULIAN_TREASURE.id,
      slug: LESSON_JULIAN_TREASURE.slug,
      title: LESSON_JULIAN_TREASURE.title,
      description: LESSON_JULIAN_TREASURE.description,
      sourceType: LESSON_JULIAN_TREASURE.sourceType,
      externalId: LESSON_JULIAN_TREASURE.externalId,
      thumbnailUrl: LESSON_JULIAN_TREASURE.thumbnailUrl,
      durationSeconds: LESSON_JULIAN_TREASURE.durationSeconds,
      durationFormatted: LESSON_JULIAN_TREASURE.durationFormatted,
      cefrLevel: LESSON_JULIAN_TREASURE.cefrLevel,
      supportedTypes: LESSON_JULIAN_TREASURE.supportedTypes,
      categoryId,
      accent: LESSON_JULIAN_TREASURE.accent,
      wpmSpeed: LESSON_JULIAN_TREASURE.wpmSpeed,
      viewCount: LESSON_JULIAN_TREASURE.viewCount,
      studyCount: LESSON_JULIAN_TREASURE.studyCount,
    }
  });

  console.log(`VideoLesson upserted: ${videoLesson.id} (${videoLesson.title})`);

  // 3. Clear existing segments and insert calibrated segments
  await prisma.lessonSegment.deleteMany({
    where: { lessonId: videoLesson.id }
  });

  for (const seg of LESSON_JULIAN_TREASURE.segments) {
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

  console.log(`Inserted ${LESSON_JULIAN_TREASURE.segments.length} calibrated segments for ${videoLesson.id}`);

  // 4. Upsert ListeningLesson table for parity
  await prisma.listeningLesson.upsert({
    where: { id: LESSON_JULIAN_TREASURE.id },
    update: {
      title: LESSON_JULIAN_TREASURE.title,
      category: "TED-Ed",
      level: "Upper-Intermediate",
      duration: LESSON_JULIAN_TREASURE.durationFormatted,
      accent: LESSON_JULIAN_TREASURE.accent || "en-GB",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_JULIAN_TREASURE.externalId}`,
      imageUrl: LESSON_JULIAN_TREASURE.thumbnailUrl,
      transcript: LESSON_JULIAN_TREASURE.segments.map((s, idx) => ({
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
      id: LESSON_JULIAN_TREASURE.id,
      title: LESSON_JULIAN_TREASURE.title,
      category: "TED-Ed",
      level: "Upper-Intermediate",
      duration: LESSON_JULIAN_TREASURE.durationFormatted,
      accent: LESSON_JULIAN_TREASURE.accent || "en-GB",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_JULIAN_TREASURE.externalId}`,
      imageUrl: LESSON_JULIAN_TREASURE.thumbnailUrl,
      transcript: LESSON_JULIAN_TREASURE.segments.map((s, idx) => ({
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

  console.log(`Synced ListeningLesson: ${LESSON_JULIAN_TREASURE.id}`);
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
